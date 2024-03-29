import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ReactNode, useCallback, useContext, useMemo } from "react";
import { CTWRequestContext } from "./ctw-context";
import { DrawerProvider } from "./drawer-provider";
import { ModalProvider } from "./modal-provider";
import { PatientContext, PatientState } from "./patient-context";
import { useCTW } from "./use-ctw";
import { editPatient, PatientFormData } from "../../content/forms/actions/patients";
import { PatientModel } from "@/fhir/models/patient";
import { getBuilderFhirPatientByExternalIdentifier, getPatientByID } from "@/fhir/patient-helper";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";
import { Tag } from "@/fhir/types";
import { useFQSFeatureToggle } from "@/hooks/use-feature-toggle";
import { QUERY_KEY_PATIENT } from "@/utils/query-keys";
import { queryClient } from "@/utils/request";
import { withTimerMetric } from "@/utils/telemetry";

// Cache patient for 5 minutes.
const PATIENT_STALE_TIME = 1000 * 60 * 5;

type ThirdPartyID = {
  patientResourceID?: never;
  patientUPID?: never;
  patientID: string;
  systemURL: string;
};

type PatientUPIDSpecified = {
  patientResourceID?: never;
  patientUPID: string;
  patientID?: never;
  systemURL?: never;
};

type PatientResourceID = {
  patientResourceID: string;
  patientUPID?: never;
  patientID?: never;
  systemURL?: never;
};

export type PatientProviderProps = {
  children: ReactNode;
  tags?: Tag[];
  onPatientSave?: (data: PatientFormData) => void;
  onResourceSave?: (data: fhir4.Resource, action: "create" | "update") => void;
} & (ThirdPartyID | PatientUPIDSpecified | PatientResourceID);

export function PatientProvider({
  children,
  patientResourceID,
  patientUPID,
  patientID,
  systemURL,
  tags,
  onPatientSave,
  onResourceSave,
}: PatientProviderProps) {
  const providerState = useMemo(
    () => ({
      patientResourceID,
      patientID: patientUPID || patientID,
      systemURL: patientUPID ? SYSTEM_ZUS_UNIVERSAL_ID : systemURL,
      tags,
      onPatientSave,
      onResourceSave,
    }),
    [patientResourceID, patientID, patientUPID, systemURL, tags, onPatientSave, onResourceSave]
  );

  return (
    <PatientContext.Provider value={providerState as PatientState}>
      <ModalProvider>
        <DrawerProvider>{children}</DrawerProvider>
      </ModalProvider>
    </PatientContext.Provider>
  );
}

export function usePatientContext() {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error("usePatient must be used within a PatientProvider");
  }

  return context;
}

export function usePatient(): UseQueryResult<PatientModel, unknown> {
  const { getRequestContext } = useCTW();

  const context = usePatientContext();

  const { patientResourceID, patientID, systemURL, tags } = context;

  return useQuery({
    queryKey: [QUERY_KEY_PATIENT, patientResourceID, patientID, systemURL, tags],
    queryFn: withTimerMetric(async () => {
      const requestContext = await getRequestContext();
      if (systemURL && patientID) {
        return getBuilderFhirPatientByExternalIdentifier(requestContext, patientID, systemURL, {
          _tag: tags?.map((tag) => `${tag.system}|${tag.code}`) ?? [],
        });
      }
      if (patientResourceID) {
        return getPatientByID(requestContext, patientResourceID);
      }
      throw new Error("Must specify a patient ID and system URL or a patient FHIR resource ID");
    }, "req.get_builder_fhir_patient"),
    staleTime: PATIENT_STALE_TIME,
    enabled: !!patientID || !!patientResourceID,
  });
}

export function usePatientPromise() {
  const { getRequestContext } = useCTW();

  const context = usePatientContext();

  return {
    context,
    getPatient: useCallback(() => {
      const { patientResourceID, patientID, systemURL, tags } = context;

      return queryClient.fetchQuery(
        [QUERY_KEY_PATIENT, patientID, systemURL, tags],
        async () => {
          const requestContext = await getRequestContext();
          if (systemURL && patientID) {
            return getBuilderFhirPatientByExternalIdentifier(requestContext, patientID, systemURL, {
              _tag: tags?.map((tag) => `${tag.system}|${tag.code}`) ?? [],
            });
          }
          if (patientResourceID) {
            return getPatientByID(requestContext, patientResourceID);
          }
          throw new Error("Must specify a patient ID and system URL or a patient FHIR resource ID");
        },
        { staleTime: PATIENT_STALE_TIME }
      );
    }, [context, getRequestContext]),
  };
}

export function useHandlePatientSave(patient?: PatientModel) {
  const { getRequestContext } = useCTW();
  const context = usePatientContext();

  const { onPatientSave } = context;

  return useCallback(
    async (data) => {
      if (patient) {
        if (onPatientSave) {
          return onPatientSave(data);
        }
        return editPatient(patient, data, getRequestContext);
      }
      throw new Error("onPatientSave requires a patient");
    },
    [onPatientSave, patient, getRequestContext]
  );
}

export function useQueryWithPatient<T, T2>(
  queryKey: string,
  keys: T2[],
  query: (requestContext: CTWRequestContext, patient: PatientModel, keys?: T2[]) => Promise<T>,
  enabled = true
) {
  const { getRequestContext } = useCTW();
  const patientResponse = usePatient();

  if (patientResponse.isSuccess && !patientResponse.data.UPID) {
    throw new Error(
      `Patient with ID ${JSON.stringify(
        patientResponse.data.resource.identifier
      )} does not have a UPID`
    );
  }
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [queryKey, patientResponse.data, ...keys],
    queryFn: async () => {
      const requestContext = await getRequestContext();
      // Ignore eslint warning as we should always have a valid
      // patient thanks to the enabled check.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return query(requestContext, patientResponse.data!, keys);
    },
    enabled: !!patientResponse.data?.UPID && enabled,
  });
}

// Need to keep this function for builder-scoped queries.
export function useFeatureFlaggedQueryWithPatient<T, T2>(
  queryKey: string,
  keys: T2[],
  variant: string,
  metric: string,
  queryFQS: (requestContext: CTWRequestContext, patient: PatientModel, keys?: T2[]) => Promise<T>
) {
  const fqs = useFQSFeatureToggle(variant);
  const query = withTimerMetric(
    async (requestContext: CTWRequestContext, patient: PatientModel) =>
      queryFQS(requestContext, patient),
    metric
  );

  return useQueryWithPatient(queryKey, [...keys, fqs.ready, fqs.enabled], query, fqs.ready);
}

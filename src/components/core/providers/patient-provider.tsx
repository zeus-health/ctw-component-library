import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ReactNode, useCallback, useContext, useMemo } from "react";
import {
  editPatient,
  PatientFormData,
} from "../../content/forms/actions/patients";
import { CTWRequestContext } from "./ctw-context";
import { useCTW } from "./ctw-provider";
import { DrawerProvider } from "./drawer-provider";
import { ModalProvider } from "./modal-provider";
import { PatientContext, PatientState } from "./patient-context";
import { PatientModel } from "@/fhir/models/patient";
import { getBuilderFhirPatient } from "@/fhir/patient-helper";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";
import { Tag } from "@/fhir/types";
import { QUERY_KEY_PATIENT } from "@/utils/query-keys";
import { queryClient } from "@/utils/request";

// Cache patient for 5 minutes.
const PATIENT_STALE_TIME = 1000 * 60 * 5;

type ThirdPartyID = {
  patientUPID?: never;
  patientID: string;
  systemURL: string;
};

type PatientUPIDSpecified = {
  patientUPID: string;
  patientID?: never;
  systemURL?: never;
};

type PatientProviderProps = {
  children: ReactNode;
  tags?: Tag[];
  onPatientSave?: (data: PatientFormData) => Promise<void>;
} & (ThirdPartyID | PatientUPIDSpecified);

export function PatientProvider({
  children,
  patientUPID,
  patientID,
  systemURL,
  tags,
  onPatientSave,
}: PatientProviderProps) {
  const providerState = useMemo(
    () => ({
      patientID: patientUPID || patientID,
      systemURL: patientUPID ? SYSTEM_ZUS_UNIVERSAL_ID : systemURL,
      tags,
      onPatientSave,
    }),
    [patientID, patientUPID, systemURL, tags, onPatientSave]
  );

  return (
    <PatientContext.Provider value={providerState as PatientState}>
      <ModalProvider>
        <DrawerProvider>{children}</DrawerProvider>
      </ModalProvider>
    </PatientContext.Provider>
  );
}

export function usePatient(): UseQueryResult<PatientModel, unknown> {
  const { getRequestContext } = useCTW();

  const context = useContext(PatientContext);

  if (!context) {
    throw new Error("usePatient must be used within a PatientProvider");
  }

  const { patientID, systemURL, tags } = context;

  return useQuery(
    [QUERY_KEY_PATIENT, patientID, systemURL, tags],
    async () => {
      const requestContext = await getRequestContext();
      return getBuilderFhirPatient(requestContext, patientID, systemURL, {
        _tag: tags?.map((tag) => `${tag.system}|${tag.code}`) ?? [],
      });
    },
    { staleTime: PATIENT_STALE_TIME }
  );
}

export function usePatientPromise() {
  const { getRequestContext } = useCTW();

  const context = useContext(PatientContext);

  return {
    getPatient: useCallback(() => {
      if (!context) {
        throw new Error("usePatient must be used within a PatientProvider");
      }

      const { patientID, systemURL, tags } = context;

      return queryClient.fetchQuery(
        [QUERY_KEY_PATIENT, patientID, systemURL, tags],
        async () => {
          const requestContext = await getRequestContext();
          return getBuilderFhirPatient(requestContext, patientID, systemURL, {
            _tag: tags?.map((tag) => `${tag.system}|${tag.code}`) ?? [],
          });
        },
        { staleTime: PATIENT_STALE_TIME }
      );
    }, [context, getRequestContext]),
  };
}

export function useHandlePatientSave(patient: PatientModel) {
  const { getRequestContext } = useCTW();
  const context = useContext(PatientContext);

  if (!context) {
    throw new Error("usePatient must be used within a PatientProvider");
  }

  const { onPatientSave } = context;

  return useCallback(
    async (data) => {
      if (onPatientSave) {
        return onPatientSave(data);
      }

      return editPatient(patient, data, getRequestContext);
    },
    [onPatientSave, patient, getRequestContext]
  );
}

export function useQueryWithPatient<T, T2>(
  queryKey: string,
  keys: T2[],
  query: (
    requestContext: CTWRequestContext,
    patient: PatientModel,
    keys?: T2[]
  ) => Promise<T>,
  enabled = true
) {
  const { getRequestContext } = useCTW();
  const patientResponse = usePatient();

  return useQuery(
    [queryKey, patientResponse.data?.UPID, ...keys],
    async () => {
      const requestContext = await getRequestContext();
      // Ignore eslint warning as we should always have a valid
      // patient thanks to the enabled check.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return query(requestContext, patientResponse.data!, keys);
    },
    { enabled: !!patientResponse.data?.UPID && enabled }
  );
}

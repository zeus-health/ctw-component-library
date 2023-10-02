/* eslint-disable no-await-in-loop */
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { PatientHistoryStatus } from "./patient-history-message-status";
import { PatientHistoryRequestDrawer } from "../patient-history-request-drawer";
import { getZusServiceUrl } from "@/api/urls";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import {
  usePatient,
  usePatientPromise,
  useQueryWithPatient,
} from "@/components/core/providers/patient-provider";
import { useCTW } from "@/components/core/providers/use-ctw";
import { PatientModel } from "@/fhir/models";
import {
  PatientHistoryJobResponse,
  PatientHistoryServiceMessage,
  PatientRefreshHistoryMessageStatus,
} from "@/services/patient-history/patient-history-types";
import { errorResponse } from "@/utils/errors";
import { find, omitBy } from "@/utils/nodash";
import { QUERY_KEY_PATIENT_HISTORY_DETAILS } from "@/utils/query-keys";
import { ctwFetch } from "@/utils/request";
import { Telemetry } from "@/utils/telemetry";

type PatientHistoryDetails = Partial<{
  status: PatientRefreshHistoryMessageStatus;
  createdAt: string;
  providers: PatientHistoryServiceMessage[];
}> & { lastRetrievedAt: string | number; hasJobs: boolean };

export function usePatientHistory(includePatientDemographicsForm?: boolean) {
  const { openDrawer } = useDrawer();
  const { getPatient } = usePatientPromise();
  const patientHistoryInformation = usePatientHistoryDetails();
  const [patientHistoryDetails, setPatientHistoryDetails] = useState<PatientHistoryDetails>();

  const [patientHistoryRequestPromise, setPatientHistoryRequestPromise] = useState<Promise<void>>();

  useEffect(() => {
    async function patientHistoryRequest() {
      if (!patientHistoryInformation.isLoading) {
        setPatientHistoryDetails(patientHistoryInformation.data as PatientHistoryDetails);
      }
    }

    setPatientHistoryRequestPromise(patientHistoryRequest());
  }, [getPatient, patientHistoryInformation.isLoading, patientHistoryInformation.data]);

  return {
    openHistoryRequestDrawer: async () => {
      let patient: PatientModel | undefined;
      try {
        await patientHistoryRequestPromise;
        patient = await getPatient();
      } catch (error) {
        patient = undefined;
      }
      openDrawer({
        component: (props) => (
          <PatientHistoryRequestDrawer
            includePatientDemographicsForm={includePatientDemographicsForm}
            setClinicalHistoryExists={() => {}}
            header={
              <>
                <PatientHistoryStatus
                  status={patientHistoryDetails?.status}
                  date={patientHistoryDetails?.createdAt}
                />
                <div className="ctw-pt-0 ctw-text-base">
                  Request patient clinical history from 70K+ providers across the nation. No changes
                  will be made to your patient record.
                </div>
              </>
            }
            patient={patient}
            {...props}
          />
        ),
        trackingMetadata: { action: "patient_history" },
      });
    },
    hasJobs: patientHistoryDetails?.hasJobs,
    lastRetrievedAt: patientHistoryDetails?.lastRetrievedAt,
    latestProviderJobs: patientHistoryDetails?.providers,
    lastStatus: patientHistoryDetails?.status,
    createdAt: patientHistoryDetails?.createdAt,
    isLoading: patientHistoryInformation.isLoading,
  };
}

export type GetBuilderRefreshHistoryMessagesParams = {
  requestContext: CTWRequestContext;
  count?: number;
  offset?: number;
  patientId?: string;
  status?: string;
  excludeFutureJobs?: boolean;
};

export async function getBuilderRefreshHistoryMessages({
  requestContext,
  count = 50,
  offset = 0,
  patientId,
  status,
  excludeFutureJobs,
}: GetBuilderRefreshHistoryMessagesParams) {
  const baseUrl = new URL(`${getZusServiceUrl(requestContext.env, "patient-history")}/jobs?`);

  const paramsObj = omitBy(
    {
      "page[count]": String(count),
      "page[offset]": offset ? String(offset + count) : String(offset),
      "filter[builder-id]": requestContext.contextBuilderId
        ? `${requestContext.contextBuilderId}`
        : "",
      "filter[patient-id]": patientId ? `${patientId}` : "",
      "filter[status]": status ? `${status}` : "",
      ...(!!excludeFutureJobs && { "filter[targetDate][until]": format(Date.now(), "yyyy-MM-dd") }),
    },
    (value) => !value
  );

  const params = new URLSearchParams([...Object.entries(paramsObj)]).toString();
  const endpointUrl = new URL(`${baseUrl}${decodeURIComponent(params)}`);

  try {
    const response = await ctwFetch(endpointUrl.href, {
      headers: {
        Authorization: `Bearer ${requestContext.authToken}`,
        ...(requestContext.contextBuilderId && {
          "Zus-Account": requestContext.contextBuilderId,
        }),
      },
    });

    return await response.json();
  } catch (err) {
    throw errorResponse("Failed fetching patient refresh history messages", err);
  }
}

export function usePatientHistoryDetails() {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_HISTORY_DETAILS,
    [],
    async (requestContext, patient) => {
      try {
        const response = (await getBuilderRefreshHistoryMessages({
          requestContext,
          patientId: patient.id,
        })) as PatientHistoryJobResponse;

        const latestDone = find(response.data, (item) =>
          item.attributes.providers.every((provider) => provider.status === "done")
        );

        const latestStatus =
          response.data[0]?.attributes.providers.filter((provider) => provider.status !== "done") ??
          [];

        return {
          hasJobs: response.data.length > 0,
          lastRetrievedAt: latestDone?.attributes.targetDate ?? latestDone?.attributes.createdAt,
          status:
            latestStatus.length > 0
              ? latestStatus[0].status
              : response.data[0]?.attributes.providers[0].status,
          createdAt: response.data[0]?.attributes.createdAt,
          providers: response.data[0]?.attributes.providers,
        };
      } catch (e) {
        Telemetry.logError(e as Error, "Failed fetching patient history details");
        throw new Error(`Failed fetching patient history details for patient: ${e}`);
      }
    }
  );
}

export function useIsFetchingHistory() {
  const [isFetching, setIsFetching] = useState(true);
  const [isPolling, setIsPolling] = useState(false);
  const { getRequestContext } = useCTW();
  const patient = usePatient();
  useEffect(() => {
    async function poll() {
      if (patient.data && !isPolling) {
        setIsPolling(true);
        const requestContext = await getRequestContext();
        await pollPatientHistory(requestContext, patient.data.id);
        setIsFetching(false);
      }
    }
    void poll();
  }, [getRequestContext, patient, isPolling]);
  return isFetching;
}

async function pollPatientHistory(requestContext: CTWRequestContext, patientId: string) {
  try {
    let isDone = false;
    do {
      await sleep(1000); // poll every 1 sec
      const response = (await getBuilderRefreshHistoryMessages({
        requestContext,
        patientId,
      })) as PatientHistoryJobResponse;

      isDone = response.data[0]?.attributes.providers.every(
        (provider) =>
          provider.status === "done" ||
          provider.status === "error" ||
          provider.status === "done_with_errors"
      );
    } while (!isDone);
  } catch (e) {
    Telemetry.logError(e as Error, "Failed fetching patient history details");
    throw new Error(`Failed fetching patient history details for patient: ${e}`);
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

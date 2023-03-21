import { useEffect, useState } from "react";
import { PatientHistoryRequestDrawer } from "../patient-history-request-drawer";
import { PatientHistoryStatus } from "./patient-history-message-status";
import { getZusApiBaseUrl } from "@/api/urls";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import {
  usePatientPromise,
  useQueryWithPatient,
} from "@/components/core/providers/patient-provider";
import { formatISODateStringToDate } from "@/fhir/formatters";
import { getBuilderPatientsListByIdentifier } from "@/fhir/patient-helper";
import { PatientRefreshHistoryMessage } from "@/services/patient-history/patient-history-types";
import { errorResponse } from "@/utils/errors";
import { compact, find } from "@/utils/nodash";
import {
  QUERY_KEY_PATIENT_HISTORY_DETAILS,
  QUERY_KEY_PATIENT_HISTORY_LIST,
} from "@/utils/query-keys";
import { ctwFetch } from "@/utils/request";
import { Telemetry } from "@/utils/telemetry";

type PatientHistoryResponse = Partial<{
  lastRetrievedAt: string;
  status: string;
  dateCreated: string;
  initialData?: { patientId?: string };
}>;

export function usePatientHistory() {
  const { openDrawer } = useDrawer();
  const { getPatient } = usePatientPromise();
  const patientHistoryInformation = usePatientHistoryDetails();
  const [patientHistoryDetails, setPatientHistoryDetails] =
    useState<PatientHistoryResponse>();

  const [patientHistoryRequestPromise, setPatientHistoryRequestPromise] =
    useState<Promise<void>>();

  useEffect(() => {
    async function patientHistoryRequest() {
      if (!patientHistoryInformation.isLoading) {
        setPatientHistoryDetails(patientHistoryInformation.data);
      }
    }

    setPatientHistoryRequestPromise(patientHistoryRequest());
  }, [
    getPatient,
    patientHistoryInformation.isLoading,
    patientHistoryInformation.data,
  ]);

  return {
    openHistoryRequestDrawer: async () => {
      await patientHistoryRequestPromise;
      const patient = await getPatient();
      openDrawer({
        component: (props) => (
          <PatientHistoryRequestDrawer
            setClinicalHistoryExists={() => {}}
            header={
              <>
                <PatientHistoryStatus
                  status={patientHistoryDetails?.status}
                  date={patientHistoryDetails?.dateCreated}
                />
                <div className="ctw-pt-0 ctw-text-base">
                  Request patient clinical history from 70K+ providers across
                  the nation. No changes will be made to your patient record.
                </div>
              </>
            }
            patient={patient}
            {...props}
          />
        ),
      });
    },
    lastRetrievedAt: formatISODateStringToDate(
      patientHistoryDetails?.lastRetrievedAt
    ),
    lastStatus: patientHistoryDetails?.status,
    dateCreatedAt: patientHistoryDetails?.dateCreated,
    isLoading: patientHistoryInformation.isLoading,
  };
}

async function getPatientRefreshHistoryMessages(
  requestContext: CTWRequestContext,
  patientID: string
) {
  const endpointUrl = `${getZusApiBaseUrl(
    requestContext.env
  )}/patient-history/messages?patient-id=${patientID}`;

  try {
    const response = await ctwFetch(endpointUrl, {
      headers: {
        Authorization: `Bearer ${requestContext.authToken}`,
        ...(requestContext.contextBuilderId && {
          "Zus-Account": requestContext.contextBuilderId,
        }),
      },
    });
    const result = await response.json();

    /* eslint no-underscore-dangle: 0 */
    return Object.values(result.data) as PatientRefreshHistoryMessage[];
  } catch (err) {
    throw errorResponse(
      "Failed fetching patient refresh history messages",
      err
    );
  }
}

async function getBuilderRefreshHistoryMessages(
  requestContext: CTWRequestContext
) {
  const builderIdParam = requestContext.contextBuilderId
    ? `?builder-id=${requestContext.contextBuilderId}`
    : "";
  const endpointUrl = `${getZusApiBaseUrl(
    requestContext.env
  )}/patient-history/messages?${builderIdParam}`;

  try {
    const response = await ctwFetch(endpointUrl, {
      headers: {
        Authorization: `Bearer ${requestContext.authToken}`,
        ...(requestContext.contextBuilderId && {
          "Zus-Account": requestContext.contextBuilderId,
        }),
      },
    });

    return await response.json();
  } catch (err) {
    throw errorResponse(
      "Failed fetching patient refresh history messages",
      err
    );
  }
}

export function useBuilderPatientHistoryList(
  pageSize: number,
  pageOffset: number
) {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_HISTORY_LIST,
    [pageSize, pageOffset],
    async (requestContext) => {
      try {
        const messages = (
          await getBuilderRefreshHistoryMessages(requestContext)
        ).data as PatientHistoryResponse[];
        console.log("messages", messages);

        const patientsIds = compact(
          messages.map((message) => message.initialData?.patientId)
        );
        console.log("patients", patientsIds);

        const response = getBuilderPatientsListByIdentifier(
          requestContext,
          undefined,
          patientsIds
        );

        const latestDone = find(messages, {
          _messages: [
            {
              status: "done",
            },
          ],
        }) as PatientRefreshHistoryMessage | undefined;
        return {
          // eslint-disable-next-line no-underscore-dangle
          lastRetrievedAt: latestDone?._createdAt,
          status: messages[0]?.status,
          // eslint-disable-next-line no-underscore-dangle
          dateCreated: messages[0]?._createdAt,
        };
      } catch (e) {
        Telemetry.logError(
          e as Error,
          "Failed fetching patient history details"
        );
        throw new Error(
          `Failed fetching patient history details for patient: ${e}`
        );
      }
    }
  );
}

export function usePatientHistoryDetails() {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_HISTORY_DETAILS,
    [],
    async (requestContext, patient) => {
      try {
        const messages = await getPatientRefreshHistoryMessages(
          requestContext,
          patient.id
        );

        const latestDone = find(messages, {
          _messages: [
            {
              status: "done",
            },
          ],
        }) as PatientRefreshHistoryMessage | undefined;
        return {
          // eslint-disable-next-line no-underscore-dangle
          lastRetrievedAt: latestDone?._createdAt,
          status: messages[0]?.status,
          // eslint-disable-next-line no-underscore-dangle
          dateCreated: messages[0]?._createdAt,
        };
      } catch (e) {
        Telemetry.logError(
          e as Error,
          "Failed fetching patient history details"
        );
        throw new Error(
          `Failed fetching patient history details for patient: ${e}`
        );
      }
    }
  );
}

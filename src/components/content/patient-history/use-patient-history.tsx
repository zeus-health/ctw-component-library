/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from "react";
import { PatientHistoryStatus } from "./patient-history-message-status";
import { PatientHistoryRequestDrawer } from "../patient-history-request-drawer";
import { getZusApiBaseUrl } from "@/api/urls";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import {
  usePatientPromise,
  useQueryWithPatient,
} from "@/components/core/providers/patient-provider";
import { PatientModel } from "@/fhir/models";
import {
  PatientHistoryServiceMessage,
  PatientRefreshHistoryMessage,
  PatientRefreshHistoryMessageStatus,
} from "@/services/patient-history/patient-history-types";
import { errorResponse } from "@/utils/errors";
import { find, omitBy } from "@/utils/nodash";
import { QUERY_KEY_PATIENT_HISTORY_DETAILS } from "@/utils/query-keys";
import { ctwFetch } from "@/utils/request";
import { Telemetry } from "@/utils/telemetry";

type PatientHistoryDetails = Partial<{
  lastRetrievedAt: string;
  status: PatientRefreshHistoryMessageStatus;
  dateCreated: string;
  serviceMessages: PatientHistoryServiceMessage[];
}>;

export function usePatientHistory(includePatientDemographicsForm?: boolean) {
  const { openDrawer } = useDrawer();
  const { getPatient } = usePatientPromise();
  const patientHistoryInformation = usePatientHistoryDetails();
  const [patientHistoryDetails, setPatientHistoryDetails] =
    useState<PatientHistoryDetails>();

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
                  messages={patientHistoryDetails?.serviceMessages}
                  status={
                    patientHistoryDetails?.status as PatientRefreshHistoryMessageStatus
                  }
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
    lastRetrievedAt: patientHistoryDetails?.lastRetrievedAt,
    latestServiceMessages: patientHistoryDetails?.serviceMessages,
    lastStatus: patientHistoryDetails?.status,
    dateCreatedAt: patientHistoryDetails?.dateCreated,
    isLoading: patientHistoryInformation.isLoading,
  };
}

export async function getBuilderRefreshHistoryMessages(
  requestContext: CTWRequestContext,
  patientId?: string
) {
  const baseUrl = new URL(
    `${getZusApiBaseUrl(requestContext.env)}/patient-history/messages?`
  );

  const paramsObj = omitBy(
    {
      "builder-id": requestContext.contextBuilderId
        ? `${requestContext.contextBuilderId}`
        : "",
      "patient-id": patientId ? `${patientId}` : "",
    },
    (value) => !value
  );

  const params = new URLSearchParams([...Object.entries(paramsObj)]).toString();

  const endpointUrl = `${baseUrl}${params}`;

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

export function usePatientHistoryDetails() {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_HISTORY_DETAILS,
    [],
    async (requestContext, patient) => {
      try {
        const response = await getBuilderRefreshHistoryMessages(
          requestContext,
          patient.id
        );

        const latestDone = find(response.data, {
          _messages: [
            {
              status: "done",
            },
          ],
        }) as PatientRefreshHistoryMessage | undefined;

        return {
          lastRetrievedAt: latestDone?._createdAt,
          status: response.data[0]?.status,
          dateCreated: response.data[0]?._createdAt,
          serviceMessages: response.data[0]._messages,
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

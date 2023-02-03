import { useEffect, useState } from "react";
import { PatientHistoryRequestDrawer } from "../patient-history-request-drawer";
import { PatientHistoryStatus } from "./patient-history-message-status";
import { getZusApiBaseUrl } from "@/api/urls";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useCTW } from "@/components/core/providers/ctw-provider";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { usePatientPromise } from "@/components/core/providers/patient-provider";
import { PatientRefreshHistoryMessage } from "@/services/patient-history/patient-history-types";
import { errorResponse } from "@/utils/errors";
import { find } from "@/utils/nodash";
import { ctwFetch } from "@/utils/request";

export function usePatientHistory() {
  const { getRequestContext } = useCTW();
  const { openDrawer } = useDrawer();
  const { getPatient } = usePatientPromise();
  const [patientHistoryDetails, setPatientHistoryDetails] =
    useState<PatientHistoryDetails>();

  const [patientHistoryRequestPromise, setPatientHistoryRequestPromise] =
    useState<Promise<void>>();

  useEffect(() => {
    async function patientHistoryRequest() {
      const patient = await getPatient();
      const requestContext = await getRequestContext();
      setPatientHistoryDetails(
        await getPatientHistoryDetails(requestContext, patient.id)
      );
    }

    setPatientHistoryRequestPromise(patientHistoryRequest());
  }, [getRequestContext, getPatient]);

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
    lastRetrievedAt: patientHistoryDetails?.lastRetrievedAt,
    lastStatus: patientHistoryDetails?.status,
    dateCreatedAt: patientHistoryDetails?.dateCreated,
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

type PatientHistoryDetails = {
  lastRetrievedAt?: string;
  status: string;
  dateCreated: string;
};

async function getPatientHistoryDetails(
  requestContext: CTWRequestContext,
  patientID: string
): Promise<PatientHistoryDetails | undefined> {
  const messages = await getPatientRefreshHistoryMessages(
    requestContext,
    patientID
  );

  if (messages.length === 0) {
    return undefined;
  }

  const latestDone = find(messages, {
    _messages: [
      {
        status: "done",
      },
    ],
  }) as PatientRefreshHistoryMessage | undefined;

  return {
    lastRetrievedAt: latestDone?._createdAt,
    status: messages[0].status,
    dateCreated: messages[0]._createdAt,
  };
}

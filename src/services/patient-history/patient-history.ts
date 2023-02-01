import { PatientRefreshHistoryMessage } from "./patient-history-types";
import { getZusApiBaseUrl } from "@/api/urls";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { errorResponse } from "@/utils/errors";
import { find } from "@/utils/nodash";
import { ctwFetch } from "@/utils/request";

export async function getPatientRefreshHistoryMessages(
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

export type PatientHistoryDetails = {
  lastRetrievedAt?: string;
  status: string;
  dateCreated: string;
};

export async function getPatientHistoryDetails(
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

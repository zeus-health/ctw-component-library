import { PatientRefreshHistoryMessage } from "./patient-history-types";
import { getZusApiBaseUrl } from "@/api/urls";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { errorResponse } from "@/utils/errors";
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

export type PatientHistoryData = {
  patientHistoryExists: boolean;
  status: string;
  dateCreated: string | undefined;
};

export async function hasFetchedPatientHistory(
  requestContext: CTWRequestContext,
  patientID: string
): Promise<PatientHistoryData> {
  const messages = await getPatientRefreshHistoryMessages(
    requestContext,
    patientID
  );

  if (messages.length === 0) {
    return { patientHistoryExists: false, status: "", dateCreated: undefined };
  }

  console.log(messages);

  switch (messages[0].status) {
    case "done":
      return {
        patientHistoryExists: true,
        status: "done",
        dateCreated: messages[0]._createdAt,
      };
    case "in_progress":
      return {
        patientHistoryExists: true,
        status: "in_progress",
        dateCreated: messages[0]._createdAt,
      };
    case "initialize":
      return {
        patientHistoryExists: true,
        status: "initialize",
        dateCreated: messages[0]._createdAt,
      };
    case "error":
      return {
        patientHistoryExists: true,
        status: "error",
        dateCreated: messages[0]._createdAt,
      };
    default:
      return {
        patientHistoryExists: false,
        status: "",
        dateCreated: messages[0]._createdAt,
      };
  }
}

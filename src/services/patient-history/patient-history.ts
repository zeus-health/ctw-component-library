import { parseISO } from "date-fns";
import { PatientRefreshHistoryMessage } from "./patient-history-types";
import { getZusApiBaseUrl } from "@/api/urls";
import { CTWRequestContext } from "@/components/core/ctw-context";
import { errorResponse } from "@/utils/errors";

export async function getPatientRefreshHistoryMessages(
  requestContext: CTWRequestContext,
  patientID: string
) {
  const endpointUrl = `${getZusApiBaseUrl(
    requestContext.env
  )}/patient-history/messages?patient-id=${patientID}`;

  try {
    const response = await fetch(endpointUrl, {
      headers: {
        Authorization: `Bearer ${requestContext.authToken}`,
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

export async function hasFetchedPatientHistory(
  requestContext: CTWRequestContext,
  patientID: string
): Promise<boolean> {
  const messages = await getPatientRefreshHistoryMessages(
    requestContext,
    patientID
  );

  if (messages.length === 0) {
    return false;
  }
  // This is the case for messages.length > 0 which is the current workaround.
  return true;
}

import { getZusApiBaseUrl } from "@/api/urls";
import { CTWRequestContext } from "@/components/core/ctw-context";
import { errorResponse } from "@/utils/errors";
import { parseISO } from "date-fns";
import { PatientRefreshHistoryMessage } from "./patient-history-types";

export async function getPatientRefreshHistoryMessages(
  requestContext: CTWRequestContext,
  patientID: string
) {
  const endpointUrl = `${getZusApiBaseUrl(
    requestContext.env
  )}/patient-history/messages?patient_id=${patientID}`;

  try {
    const response = await fetch(endpointUrl, {
      headers: {
        Authorization: `Bearer ${requestContext.authToken}`,
      },
    });
    const result = await response.json();

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
  patientID: string,
  statuses: string[]
): Promise<Boolean> {
  const messages = await getPatientRefreshHistoryMessages(
    requestContext,
    patientID
  );

  if (messages.length === 0) {
    return false;
  }

  const latestMessage = messages.reduce((previous, current) =>
    parseISO(current._updatedAt) > parseISO(previous._updatedAt) &&
    statuses.includes(current.status)
      ? current
      : previous
  );
  // There is a bug with the API that will be reworked in 2 weeks. Leaving as is for now.
  if (latestMessage?.status === "done" && latestMessage?._errors) {
    return false;
  } else if (latestMessage?.status === "done") {
    return true;
  } else {
    return false;
  }
}

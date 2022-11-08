import { getZusApiBaseUrl } from "@/api/urls";
import { CTWRequestContext } from "@/components/core/ctw-context";
import {
  PatientRefreshHistoryMessage,
  RawPatientRefreshHistoryMessage,
} from "@/fhir/types";
import { errorResponse } from "@/utils/errors";
import { parseISO } from "date-fns";

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
        "practitioner-npi": "1245319599",
        "practitioner-role": "Test Provider",
      },
    });
    const result = await response.json();
    console.log("result", result);
    return (
      Object.values(result.data) as RawPatientRefreshHistoryMessage[]
    ).map((entry: RawPatientRefreshHistoryMessage) => ({
      status: entry.status,
      messageUuid: entry.messageUuid,
      initialData: entry.initialData,
      createdAt: entry._createdAt,
      updatedAt: entry._updatedAt,
    })) as PatientRefreshHistoryMessage[];
  } catch (err) {
    throw errorResponse(
      "Failed fetching patient refresh history messages",
      err
    );
  }
}

export async function getLatestPatientRefreshHistoryMessage(
  requestContext: CTWRequestContext,
  patientID: string,
  statuses: string[]
) {
  const messages = await getPatientRefreshHistoryMessages(
    requestContext,
    patientID
  );
  if (messages.length === 0) {
    return null;
  }

  return messages.reduce((previous, current) =>
    parseISO(current.updatedAt) > parseISO(previous.updatedAt) &&
    statuses.includes(current.status)
      ? current
      : previous
  );
}

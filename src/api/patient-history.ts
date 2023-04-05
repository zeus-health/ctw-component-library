import { getZusApiBaseUrl } from "./urls";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { ctwFetch } from "@/utils/request";
import { Telemetry } from "@/utils/telemetry";

export type PatientHistoryResponseError = {
  // TODO: Can code be a list of status codes? Do we have that type defined anywhere.
  code: number;
  title: string;
  details: string;
};

export const schedulePatientHistory = async (
  requestContext: CTWRequestContext,
  patientIdentifiers: { id?: string; systemURL: string; patientID: string },
  resultData: { npi: string; role: string; name: string }
) => {
  const { id, systemURL, patientID } = patientIdentifiers;
  const endpointUrl = `${getZusApiBaseUrl(
    requestContext.env
    // If patientID is empty, just pass any non-identifying string in url.
  )}/patient-history/patient/${id ?? "NULL"}/refresh?consent=1`;

  try {
    const response = await ctwFetch(endpointUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${requestContext.authToken}`,
        "practitioner-npi": resultData.npi,
        "practitioner-role": resultData.role.toLocaleLowerCase(),
        "practitioner-name": resultData.name,
        ...(requestContext.contextBuilderId && {
          "Zus-Account": requestContext.contextBuilderId,
        }),
      },
      body: JSON.stringify({ systemURL, patientID }),
    });

    return await response.json();
  } catch (e) {
    Telemetry.logError(
      e as Error,
      `Error scheduling patient history job with id of ${patientID}`
    );
    throw Error(`Error scheduling patient history job with id of ${patientID}`);
  }
};

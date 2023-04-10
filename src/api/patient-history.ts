import { getZusProxyApiBaseUrl } from "./urls";
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
  patientIdentifiers: { systemURL: string; patientID: string },
  resultData: { id?: string; npi: string; role: string; name: string }
) => {
  const { systemURL, patientID } = patientIdentifiers;
  const endpointUrl = `${getZusProxyApiBaseUrl(
    requestContext.env
    // If patientID is empty, just pass any non-identifying string in url.
  )}/patient-history/patient/${resultData.id ?? "NULL"}/refresh?consent=1`;

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
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (e) {
    const err = e as Error;
    const errorMessage = `Error scheduling patient history job with id of ${patientID}: ${err.message}`;
    Telemetry.logError(err, errorMessage);
    return new Error(errorMessage);
  }
};

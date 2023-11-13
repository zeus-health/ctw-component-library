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
  patientIdentifier: { systemURL?: string; patientID?: string },
  resultData: { id?: string; npi: string; role: string; name: string }
) => {
  const { systemURL, patientID } = patientIdentifier;
  const endpointUrl = `${getZusProxyApiBaseUrl(
    requestContext.env
    // If patientID is empty, just pass any non-identifying string in url.
  )}/patient-history/jobs`;

  const body = {
    data: {
      type: "patient-history/jobs",
      attributes: {
        requestConsent: true,
        practitioner: {
          npi: resultData.npi,
          name: resultData.name,
          role: resultData.role.toLocaleLowerCase(),
        },
      },
      relationships: {
        patient: {
          // If patientID is empty, just pass any non-identifying string in url.
          data: { type: "fhir/Patient", id: resultData.id ?? "NULL" },
        },
      },
    },
  };

  try {
    const response = await ctwFetch(endpointUrl, {
      method: "POST",
      headers: {
        "ehr-data-integration-proxy": JSON.stringify({
          patientID,
          systemURL,
        }),
        Authorization: `Bearer ${requestContext.authToken}`,
        ...(requestContext.contextBuilderId && {
          "Zus-Account": requestContext.contextBuilderId,
        }),
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (e) {
    const err = e as Error;
    const errorMessage = `Error requesting patient history.`;
    Telemetry.logError(err, errorMessage);
    return new Error(errorMessage);
  }
};

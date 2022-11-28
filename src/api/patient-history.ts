import { CTWRequestContext } from "@/components/core/ctw-context";
import { getZusApiBaseUrl } from "./urls";

export type PatientHistoryResponseError = {
  // TODO: Can code be a list of status codes? Do we have that type defined anywhere.
  code: number;
  title: string;
  details: string;
};

export const schedulePatientHistory = async (
  requestContext: CTWRequestContext,
  patientID: string,
  resultData: { npi: string; role: string; name: string }
) => {
  const endpointUrl = `${getZusApiBaseUrl(
    requestContext.env
  )}/patient-history/patient/${patientID}/refresh?reset=1`;

  try {
    const response = await fetch(endpointUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${requestContext.authToken}`,
        "practitioner-npi": resultData.npi,
        "practitioner-role": resultData.role.toLocaleLowerCase(),
        "practitioner-name": resultData.name,
      },
    });
    return await response.json();
  } catch (e) {
    throw Error(`Error scheduling patient history job with id of ${patientID}`);
  }
};

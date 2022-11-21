import { CTWRequestContext } from "@/components/core/ctw-context";
import { claimsBuilderId, claimsBuilderName } from "@/utils/auth";
import { getZusApiBaseUrl } from "./urls";

export const schedulePatientHistory = async (
  requestContext: CTWRequestContext,
  patientID: string,
  resultData: { npi: string; role: string; name: string }
) => {
  const endpointUrl = `${getZusApiBaseUrl(
    requestContext.env
  )}/patient-history/patient/${patientID}/refresh`;

  try {
    const response = await fetch(endpointUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${requestContext.authToken}`,
        "practitioner-npi": resultData.npi,
        "practitioner-role": resultData.role,
        "practitioner-name": resultData.name,
        "organziation-id": claimsBuilderId(requestContext.authToken),
        "organziation-name": claimsBuilderName(requestContext.authToken),
      },
    });
    const data = await response.json();
    // TODO: handle error from server
  } catch (e) {
    throw Error(`Error scheduling patient history job with id of ${patientID}`);
  }
};

import { CTWRequestContext } from "@/components/core/ctw-context";
import { getZusApiBaseUrl } from "./urls";

export const getPatientHistoryMessages = async (
  requestContext: CTWRequestContext,
  patientID: string
) => {
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
  } catch (e) {
    console.log("e", e);
  }
};

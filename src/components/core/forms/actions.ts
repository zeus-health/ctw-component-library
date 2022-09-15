import Client from "fhir-kit-client";
import { createCondition } from "./helpers";

export const action = async (
  formData: FormData,
  formAction: string,
  patientID: string,
  getCTWFhirClient: () => Promise<Client>
) => {
  switch (formAction) {
    case "createCondition":
      return createCondition(formData, patientID, getCTWFhirClient);
    default: {
      throw new Error(`Unexpected action: ${formAction}`);
    }
  }
};

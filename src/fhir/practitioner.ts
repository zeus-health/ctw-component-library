import Client from "fhir-kit-client";
import { searchBuilderRecords } from "./search-helpers";

export const getPractitioner = async (
  practitionerId: string,
  patientUPID: string,
  fhirClient: Client
) => {
  try {
    const { resources: practitioners } = await searchBuilderRecords(
      "Practitioner",
      fhirClient,
      {
        patientUPID,
        identifier: practitionerId,
      }
    );

    return practitioners;
  } catch (e) {
    throw new Error(`Failed fetching condition information for patient: ${e}`);
  }
};

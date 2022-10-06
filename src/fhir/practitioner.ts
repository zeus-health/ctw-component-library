import Client from "fhir-kit-client";
import { searchBuilderRecords } from "./search-helpers";

export const getPractitioner = async (
  practitionerId: string,
  patientUPID: string,
  fhirClient: Client
) => {
  try {
    console.log("here", practitionerId);
    const { resources: practitioners } = await searchBuilderRecords(
      "Practitioner",
      fhirClient,
      {
        // patientUPID,
        _id: practitionerId,
      }
    );
    console.log("practitioners", practitioners);

    return practitioners;
  } catch (e) {
    console.log(e);
    throw new Error(
      `Failed fetching condition information for practitioner: ${e}`
    );
  }
};

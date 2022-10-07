import Client from "fhir-kit-client";
import { searchBuilderRecords } from "./search-helpers";

export const getPractitioner = async (
  practitionerId: string,
  fhirClient: Client
) => {
  try {
    const { resources: practitioners } = await searchBuilderRecords(
      "Practitioner",
      fhirClient,
      {
        _id: practitionerId,
      }
    );

    return practitioners;
  } catch (e) {
    throw new Error(
      `Failed fetching practitioner with an id of: ${practitionerId}. ${e}`
    );
  }
};

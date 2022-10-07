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

    if (practitioners.length === 0) {
      throw new Error(`No practitioner found with an id of: ${practitionerId}`);
    }

    return practitioners[0];
  } catch (e) {
    throw new Error(
      `Failed fetching practitioner with an id of: ${practitionerId}. ${e}`
    );
  }
};

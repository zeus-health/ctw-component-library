import Client from "fhir-kit-client";
import { searchBuilderRecords } from "./search-helpers";

export const getPractitioner = async (
  practitionerId: string,
  fhirClient: Client
) => {
  let practitioners = [];
  try {
    const { resources } = await searchBuilderRecords(
      "Practitioner",
      fhirClient,
      {
        _id: practitionerId,
      }
    );

    practitioners = resources;
  } catch (error) {
    throw new Error(
      `Failed fetching practitioner with an id of: ${practitionerId}. ${error}`
    );
  }

  if (!practitioners[0]) {
    throw new Error(`No practitioner found with an id of: ${practitionerId}`);
  }

  return practitioners[0];
};

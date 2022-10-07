import Client from "fhir-kit-client";
import { searchBuilderRecords } from "./search-helpers";

class PractitionerNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PractitionerNotFoundError";
  }
}

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
      throw new PractitionerNotFoundError(
        `No practitioner found with an id of: ${practitionerId}`
      );
    }

    return practitioners[0];
  } catch (error) {
    if (error instanceof PractitionerNotFoundError) {
      throw new PractitionerNotFoundError(
        `No practitioner found with an id of: ${practitionerId}`
      );
    }

    throw new Error(
      `Failed fetching practitioner with an id of: ${practitionerId}. ${error}`
    );
  }
};

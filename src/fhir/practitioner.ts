import { CTWRequestContext } from "@/components/core/ctw-context";
import { PractitionerModel } from "@/fhir/models/practitioner";
import { searchBuilderRecords } from "./search-helpers";

export const getPractitioner = async (
  practitionerId: string,
  requestContext: CTWRequestContext
) => {
  let practitioners = [];
  try {
    const { resources } = await searchBuilderRecords(
      "Practitioner",
      requestContext,
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

  return new PractitionerModel(practitioners[0]);
};

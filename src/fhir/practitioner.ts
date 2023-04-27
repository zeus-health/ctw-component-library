import { Reference } from "fhir/r4";
import { searchBuilderRecords } from "./search-helpers";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { PractitionerModel } from "@/fhir/models/practitioner";
import { claimsAuthEmail, claimsPractitionerId } from "@/utils/auth";
import { withTimerMetric } from "@/utils/telemetry";

const getPractitioner = async (practitionerId: string, requestContext: CTWRequestContext) => {
  let practitioners = [];
  try {
    const { resources } = await searchBuilderRecords("Practitioner", requestContext, {
      _id: practitionerId,
    });

    practitioners = resources;
  } catch (error) {
    throw new Error(`Failed fetching practitioner with an id of: ${practitionerId}. ${error}`);
  }

  if (!practitioners[0]) {
    throw new Error(`No practitioner found with an id of: ${practitionerId}`);
  }

  return new PractitionerModel(practitioners[0]);
};

// Returns a reference for the user's practitioner by looking
// up the practitioner from the user's claims data.
// If the user does not have an associated practitioner, then we
// use their email address as the display in the reference.
async function getUsersPractitionerReferenceReq(
  requestContext: CTWRequestContext
): Promise<Reference> {
  const practitionerId = claimsPractitionerId(requestContext.authToken);
  if (practitionerId) {
    const practitioner = await getPractitioner(practitionerId, requestContext);
    return {
      reference: `Practitioner/${practitionerId}`,
      type: "Practitioner",
      display: practitioner.fullName,
    };
  }

  return {
    display: claimsAuthEmail(requestContext.authToken),
  };
}

export const getUsersPractitionerReference = withTimerMetric(
  getUsersPractitionerReferenceReq,
  "req.get_users_practitioner_reference"
);

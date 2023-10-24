import { Reference } from "fhir/r4";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { claimsAuthEmail, claimsPractitionerId } from "@/utils/auth";

// Use their email address as the display if no practitioner reference available.
export async function getUsersPractitionerReference(
  requestContext: CTWRequestContext
): Promise<Reference> {
  const practitionerId = claimsPractitionerId(requestContext.authToken);
  if (practitionerId) {
    return {
      reference: `Practitioner/${practitionerId}`,
      type: "Practitioner",
    };
  }
  return {
    display: claimsAuthEmail(requestContext.authToken),
  };
}

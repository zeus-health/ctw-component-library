import { CTWRequestContext } from "@/components/core/ctw-context";
import {
  claimsAuthEmail,
  claimsBuilderName,
  claimsPractitionerId,
} from "@/utils/auth";
import { Provenance, Resource } from "fhir/r4";
import { getPractitioner } from "./practitioner";
import {
  SYSTEM_PROVENANCE_ACTIVITY_TYPE,
  SYSTEM_PROVENANCE_AGENT_TYPE,
} from "./system-urls";

const ASSEMBLER_CODING = {
  system: SYSTEM_PROVENANCE_AGENT_TYPE,
  code: "assembler",
  display: "Assembler",
};

const CREATE_CODING = {
  coding: [
    {
      system: SYSTEM_PROVENANCE_ACTIVITY_TYPE,
      code: "CREATE",
      display: "create",
    },
  ],
};

const UPDATE_CODING = {
  coding: [
    {
      system: SYSTEM_PROVENANCE_ACTIVITY_TYPE,
      code: "UPDATE",
      display: "revise",
    },
  ],
};

export const createProvenance = async (
  type: "CREATE" | "UPDATE",
  resource: Resource,
  requestContext: CTWRequestContext
) => {
  const { fhirClient } = requestContext;
  const practitionerId = claimsPractitionerId(requestContext.authToken);
  const builderName = claimsBuilderName(requestContext.authToken);

  let practitionerDisplay: string;
  let practitionerReference: string | undefined;
  try {
    const practitioner = await getPractitioner(practitionerId, requestContext);
    practitionerDisplay = practitioner.fullName;
    practitionerReference = `Practitioner/${practitionerId}`;
  } catch {
    practitionerDisplay = claimsAuthEmail(requestContext.authToken);
  }

  const provenance: Provenance = {
    resourceType: "Provenance",
    agent: [
      {
        who: {
          reference: practitionerReference,
          display: practitionerDisplay,
        },
        onBehalfOf: { display: builderName },
      },
      {
        type: {
          coding: [ASSEMBLER_CODING],
        },
        who: { display: "Zus Health" },
      },
    ],
    recorded: new Date().toISOString(),
    target: [
      {
        reference: `${resource.resourceType}/${resource.id}`,
        type: resource.resourceType,
      },
    ],
  };
  provenance.activity = type === "CREATE" ? CREATE_CODING : UPDATE_CODING;
  return fhirClient.create({
    resourceType: "Provenance",
    body: provenance,
  });
};

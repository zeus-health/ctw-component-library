import { Provenance, Resource } from "fhir/r4";
import { getUsersPractitionerReference } from "./practitioner";
import {
  SYSTEM_PROVENANCE_ACTIVITY_TYPE,
  SYSTEM_PROVENANCE_AGENT_TYPE,
} from "./system-urls";
import { CTWRequestContext } from "@/components/core/ctw-context";
import { claimsBuilderName } from "@/utils/auth";

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
  const builderName = claimsBuilderName(requestContext.authToken);
  const versionId = parseInt(resource.meta?.versionId || "0", 10);

  const provenance: Provenance = {
    resourceType: "Provenance",
    agent: [
      {
        who: await getUsersPractitionerReference(requestContext),
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
        reference: `${resource.resourceType}/${resource.id}/_history/${versionId}`,
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

import { Provenance, Resource } from "fhir/r4";
import { FHIRModel } from "./models/fhir-model";
import { getUsersPractitionerReference } from "./practitioner";
import { searchAllRecords } from "./search-helpers";
import { SYSTEM_PROVENANCE_ACTIVITY_TYPE, SYSTEM_PROVENANCE_AGENT_TYPE } from "./system-urls";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { claimsBuilderName } from "@/utils/auth";
import { uniq } from "@/utils/nodash";
import { QUERY_KEY_PROVENANCE } from "@/utils/query-keys";
import { queryClient } from "@/utils/request";
import { Telemetry } from "@/utils/telemetry";

export const ASSEMBLER_CODING = {
  system: SYSTEM_PROVENANCE_AGENT_TYPE,
  code: "assembler",
  display: "Assembler",
};

export const CREATE_CODING = {
  coding: [
    {
      system: SYSTEM_PROVENANCE_ACTIVITY_TYPE,
      code: "CREATE",
      display: "create",
    },
  ],
};

export const UPDATE_CODING = {
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
  try {
    const response = fhirClient.create({
      resourceType: "Provenance",
      body: provenance,
    });
    Telemetry.reportActionSuccess(`${resource.resourceType}.provenance`);
    return response;
  } catch (error) {
    Telemetry.reportActionFailure(`${resource.resourceType}.provenance`);
    throw error;
  }
};

export async function searchProvenances<T extends fhir4.Resource>(
  requestContext: CTWRequestContext,
  models: FHIRModel<T>[]
): Promise<Provenance[]> {
  // FIXME:
  // 1. bucket models into type => array of ids
  // 2. For each type
  //    a. query for provenance using upid (e.g. {fhir_url}/<ResourceType>?patient.identifier=<UPI-System|UPID>&_revinclude=Provenance:target)
  //    b. organize the results for quick id => provenance lookup
  // 4. Tie results back to the original model order

  const target = uniq(models.map((m) => `${m.resourceType}/${m.id}`)).join(",");

  const { resources } = await queryClient.fetchQuery([QUERY_KEY_PROVENANCE, target], async () =>
    searchAllRecords("Provenance", requestContext, {
      target,
    })
  );

  return resources;
}

import { Provenance, Resource } from "fhir/r4";
import { getResources } from "./bundle";
import { FHIRModel } from "./models/fhir-model";
import { getUsersPractitionerReference } from "./practitioner";
import { searchAllRecords } from "./search-helpers";
import {
  SYSTEM_PROVENANCE_ACTIVITY_TYPE,
  SYSTEM_PROVENANCE_AGENT_TYPE,
  SYSTEM_ZUS_UNIVERSAL_ID,
} from "./system-urls";
import { ResourceTypeString } from "./types";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { searchProvenancesFQS } from "@/services/fqs/queries/provenances";
import { claimsBuilderName } from "@/utils/auth";
import { uniq } from "@/utils/nodash";
import { QUERY_KEY_PROVENANCE } from "@/utils/query-keys";
import { queryClient } from "@/utils/request";
import { Telemetry } from "@/utils/telemetry";

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
    activity: type === "CREATE" ? CREATE_CODING : UPDATE_CODING,
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
  models: FHIRModel<T>[],
  enableFQS = false
): Promise<Provenance[]> {
  if (models.length === 0) return [];

  const targets = uniq(models.map((m) => `${m.resourceType}/${m.id}`));
  const ids = models.map((m) => m.id);

  if (enableFQS) {
    return searchProvenancesFQS(requestContext, models[0].resourceType, targets);
  }
  return searchProvenancesODS(requestContext, ids, models[0].resourceType, models[0].patientUPID);
}

export async function searchProvenancesODS(
  requestContext: CTWRequestContext,
  ids: string[],
  resourceType: ResourceTypeString,
  patientUPID: string | undefined
) {
  const id = ids.join(",");
  const { bundle } = await queryClient.fetchQuery([QUERY_KEY_PROVENANCE, id], async () => {
    if (resourceType === "Practitioner") {
      return searchAllRecords(resourceType, requestContext, {
        _id: id,
        _revinclude: "Provenance:target",
      });
    }
    return searchAllRecords(resourceType, requestContext, {
      _id: id,
      _revinclude: "Provenance:target",
      // Need to include patient identifier to work around CPR.
      "patient.identifier": patientUPID ? `${SYSTEM_ZUS_UNIVERSAL_ID}|${patientUPID}` : "",
    });
  });

  return getResources(bundle, "Provenance");
}

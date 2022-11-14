import { CTWRequestContext } from "@/components/core/ctw-context";
import {
  claimsAuthEmail,
  claimsBuilderName,
  claimsPractitionerId,
} from "@/utils/auth";
import { Provenance, Resource } from "fhir/r4";
import { omitEmptyArrays } from "./client";
import { isFhirError } from "./errors";
import {
  SYSTEM_PROVENANCE_ACTIVITY_TYPE,
  SYSTEM_PROVENANCE_AGENT_TYPE,
} from "./system-urls";

export async function createOrEditFhirResource(
  resource: Resource,
  requestContext: CTWRequestContext
) {
  const practitionerId = claimsPractitionerId(requestContext.authToken);
  const builderName = claimsBuilderName(requestContext.authToken);
  const authEmail = claimsAuthEmail(requestContext.authToken);
  const { fhirClient } = requestContext;
  const resourceModified = resource;
  const createProvenance = async (type: "CREATE" | "UPDATE") => {
    let provenance: Provenance = {
      resourceType: "Provenance",
      agent: [
        {
          who: {
            reference:
              practitionerId === ""
                ? undefined
                : `Practitioner/${practitionerId}`,
            display: authEmail,
          },
          onBehalfOf: { display: builderName },
        },
        {
          type: {
            coding: [
              {
                system: SYSTEM_PROVENANCE_AGENT_TYPE,
                code: "assembler",
                display: "Assembler",
              },
            ],
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
    if (type === "CREATE") {
      provenance = {
        ...provenance,
        activity: {
          coding: [
            {
              system: SYSTEM_PROVENANCE_ACTIVITY_TYPE,
              code: "CREATE",
              display: "create",
            },
          ],
        },
      };
    } else {
      provenance = {
        ...provenance,
        activity: {
          coding: [
            {
              system: SYSTEM_PROVENANCE_ACTIVITY_TYPE,
              code: "UPDATE",
              display: "revise",
            },
          ],
        },
      };
    }
    const response = await fhirClient.create({
      resourceType: "Provenance",
      body: provenance,
    });
  };

  try {
    if (resource.id) {
      const response = await fhirClient.update({
        resourceType: resource.resourceType,
        id: resource.id,
        body: omitEmptyArrays(resource),
      });
      if (!isFhirError(response)) {
        createProvenance("UPDATE");
      }
      return response;
    }
    const response = await fhirClient.create({
      resourceType: resource.resourceType,
      body: omitEmptyArrays(resource),
    });
    if (!isFhirError(response)) {
      resourceModified.id = response.id;
      createProvenance("CREATE");
    }
    return response;
  } catch (err) {
    return err;
  }
}

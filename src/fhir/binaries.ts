import { Provenance } from "fhir/r4";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { find, some } from "@/utils/nodash";
import { QUERY_KEY_BINARY } from "@/utils/query-keys";
import { queryClient } from "@/utils/request";

export function getBinaryId(
  provenances: Provenance[],
  targetId: string
): string | undefined {
  for (let i = 0; i < provenances.length; i += 1) {
    const provenance = provenances[i];

    const hasTarget = some(provenance.target, (t) =>
      t.reference?.includes(targetId)
    );

    if (hasTarget) {
      const source = find(provenance.entity, { role: "source" });
      if (source) {
        // Return the ID portion of the reference.
        return source.what.reference?.split("/")[1];
      }
    }
  }

  return undefined;
}

export async function getBinaryDocument(
  requestContext: CTWRequestContext,
  binaryId: string
): Promise<fhir4.Binary> {
  return queryClient.fetchQuery([QUERY_KEY_BINARY, binaryId], async () =>
    requestContext.fhirClient.read({
      resourceType: "Binary",
      id: binaryId,
    })
  );
}

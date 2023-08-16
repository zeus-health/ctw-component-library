import { Provenance } from "fhir/r4";
import { isRenderableBinary } from "@/components/content/resource/helpers/filters";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { find, some } from "@/utils/nodash";
import { QUERY_KEY_BINARY } from "@/utils/query-keys";
import { queryClient } from "@/utils/request";
import { withTimerMetric } from "@/utils/telemetry";

// Get the binary ID from provenance, if document is renderable
export function getBinaryId(provenances: Provenance[], targetId: string): string | undefined {
  for (let i = 0; i < provenances.length; i += 1) {
    const provenance = provenances[i];

    const hasTarget = some(provenance.target, (t) => t.reference?.includes(targetId));

    if (hasTarget && isRenderableBinary(provenance)) {
      const source = find(provenance.entity, { role: "source" });
      if (source?.what.reference) {
        // Return the ID portion of the reference.
        return source.what.reference.split("/")[1];
      }
    }
  }

  return undefined;
}

async function getBinaryDocumentReq(
  requestContext: CTWRequestContext,
  binaryId: string
): Promise<fhir4.Binary> {
  return queryClient.fetchQuery([QUERY_KEY_BINARY, binaryId], async () => {
    const response = await requestContext.fetchFromFqs(`Binary/${binaryId}`, {
      method: "GET",
    });

    if (response.status === 200) {
      return {
        contentType: response.headers.get("Content-Type") || "unknown",
        resourceType: "Binary",
        data: await response.text(),
      };
    }

    // fall back to asking ODS for the binary
    // Remove this once FQS is backfilled + dekludge is completed
    const based64binary = (await requestContext.fhirClient.read({
      resourceType: "Binary",
      id: binaryId,
    })) as fhir4.Binary;

    const decodedData = atob(based64binary.data || "");

    return {
      resourceType: "Binary",
      contentType: based64binary.contentType,
      data: decodedData,
    };
  });
}

export const getBinaryDocument = withTimerMetric(getBinaryDocumentReq, "req.binary_document");

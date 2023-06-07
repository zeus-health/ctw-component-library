/* eslint-disable no-await-in-loop */
import { createGraphqlClient } from "./client";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { get } from "@/utils/nodash";
import { Telemetry } from "@/utils/telemetry";

// We'll keep retrying until we've gone over our timeout.
const TIMEOUT_MS = 20_000;

// Due to mutations going to ODS, there is a delay
// before FQS has the latest fresh resource.
// This function will poll FQS until the resource.meta.lastUpdated timestamp
// is greater or equal to the provided lastUpdated timestamp.
export async function longPollFQS(
  requestContext: CTWRequestContext,
  resourceType: string,
  resourceId: string,
  lastUpdated: string
): Promise<boolean> {
  const graphClient = createGraphqlClient(requestContext);
  const query = `query GetLastUpdated {
      ${resourceType}(id: "${resourceId}") {
        meta {
          lastUpdated
        }
      }
    }`;

  const targetTimestamp = Date.parse(lastUpdated);
  let retryCount = 0;
  let currentTimestamp = 0;
  const startTime = Date.now();
  do {
    // Exponential backoff how long we wait between retries.
    await sleep(100 * 2 ** retryCount);
    retryCount += 1;

    // Refetch the resource from FQS.
    try {
      const data = await graphClient.request(query);
      currentTimestamp = Date.parse(String(get(data, "Condition.meta.lastUpdated")));
    } catch (err) {
      // Ignore errors and retry.
      // This can happen if we just created a new resource that isn't in FQS yet.
    }
  } while (currentTimestamp < targetTimestamp && Date.now() - startTime < TIMEOUT_MS);

  Telemetry.histogramMetric(`fqs.longpoll.${resourceType}`, Date.now() - startTime);
  return currentTimestamp >= targetTimestamp;
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

import { graphql } from "msw";
import { setupServer } from "msw/node";
import { beforeAll, vi } from "vitest";
import { longPollFQS } from "./long-poll-fqs";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";

const server = setupServer();
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  server.resetHandlers();
  vi.restoreAllMocks();
});

describe("longPollFQS", () => {
  it("should return true when first request has latest data", async () => {
    // Mock a response that has lastUpdated after our target.
    mockLastUpdated(["12/12/2023 8:33:33"]);
    const response = longPollFQS(requestContext, "Condition", "12345", "12/12/2023 8:33:00");
    // Only need to bump time past first sleep.
    await vi.advanceTimersByTimeAsync(110);
    expect(await response).toEqual(true);
  });

  it("should return true when third request has latest data", async () => {
    // First two are before our target, while last is after
    mockLastUpdated(["12/12/2023 5:40:00", "12/12/2023 5:40:00", "12/12/2023 8:33:33"]);
    const response = longPollFQS(requestContext, "Condition", "12345", "12/12/2023 8:33:00");
    // Bump time past first few sleeps.
    await vi.advanceTimersByTimeAsync(1000);
    expect(await response).toEqual(true);
  });

  it("should return false when we hit our timeout and lastUpdated is still old", async () => {
    mockLastUpdated("12/12/2023 5:40:00");
    const response = longPollFQS(requestContext, "Condition", "12345", "12/12/2023 8:33:00");
    // Bump our time past the expontential backoff timeout.
    // This way all retries should have happened and longPollFQS
    // should exit its while loop and return false.
    await vi.advanceTimersByTimeAsync(25_600);
    expect(await response).toEqual(false);
  });
});

const requestContext = { env: "dev", authToken: "1234", builderId: "1234" } as CTWRequestContext;

// Mocks the FQS response for the lastUpdated query.
// Uses res.once if lastUpdated is an array, otherwise
// always returns the provided string.
function mockLastUpdated(lastUpdated: string[] | string) {
  const useOnce = Array.isArray(lastUpdated);
  const lastUpdates = useOnce ? lastUpdated : [lastUpdated];
  const handlers = lastUpdates.map((timestamp) => {
    const response = {
      Condition: {
        meta: {
          lastUpdated: timestamp,
        },
      },
    };

    return graphql.query("GetLastUpdated", (req, res, ctx) =>
      (useOnce ? res.once : res)(ctx.data(response))
    );
  });
  server.use(...handlers);
}

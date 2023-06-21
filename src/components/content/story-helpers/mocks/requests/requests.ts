import { rest } from "msw";
import { binary } from "../resources/binary";
import { unleashVariant } from "../resources/unleash";

export const mockBinaryGet = () => [
  rest.get("https://api.dev.zusapi.com/fhir/Binary/:BinaryId", async (_, res, ctx) =>
    res(ctx.status(200), ctx.json(binary))
  ),

  // For now just have FQS return an error so we fallback on ODS.
  rest.get("https://api.dev.zusapi.com/fqs/Binary/:BinaryId", async (_, res, ctx) =>
    res(ctx.status(500))
  ),
];

export const mockUnleashFQSEnabledGet = (resourceType: string) =>
  rest.get("https://unleash-proxy-prod.zusapi.com/*", async (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json(unleashVariant("test", "conditions", { [resourceType]: true }, true))
    )
  );

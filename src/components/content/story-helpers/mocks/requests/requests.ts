import { rest } from "msw";
import { binary } from "../resources/binary";

export const mockBinaryGet = () =>
  rest.get("https://api.dev.zusapi.com/fhir/Binary/:BinaryId", async (_, res, ctx) =>
    res(ctx.status(200), ctx.json(binary))
  );

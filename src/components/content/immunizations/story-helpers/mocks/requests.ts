import { graphql, rest } from "msw";
import { immunizations } from "./immunizations";
import { immunizationsFQS } from "./immunizations-fqs";
import { patient } from "./patient";

export function setupImmunizationMocks() {
  return {
    parameters: {
      msw: { handlers: { mocks: mockRequests() } },
    },
  };
}

function mockRequests() {
  const mockPatientGet = rest.get(
    "https://api.dev.zusapi.com/fhir/Patient",
    // Add ctx.delay(750), delay to show loading, we set this to 750ms to be
    // less than the default testing-library timeout of 1000ms.
    (_, res, ctx) => res(ctx.delay(750), ctx.status(200), ctx.json(patient))
  );

  const mockImmunizationGet = rest.get(
    "https://api.dev.zusapi.com/fhir/Immunization",
    (_, res, ctx) => res(ctx.status(200), ctx.json(immunizations))
  );

  const mockImmunizationFQSPost = graphql.query("Immunizations", (_, res, ctx) =>
    res(ctx.delay(750), ctx.status(200), ctx.data(immunizationsFQS))
  );

  return [mockPatientGet, mockImmunizationGet, mockImmunizationFQSPost];
}

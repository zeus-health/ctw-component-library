import { rest } from "msw";
import { immunizations } from "./immunizations";
import { patient } from "./patient";

export function setupImmunizationMocks() {
  return {
    parameters: {
      msw: mockRequests(),
    },
  };
}

function mockRequests() {
  const mockPatientGet = rest.get(
    "https://api.dev.zusapi.com/fhir/Patient",
    // Add ctx.delay(750), delay to show loading, we set this to 750ms to be
    // less than the default testing-library timeout of 1000ms.
    (req, res, ctx) => res(ctx.delay(750), ctx.status(200), ctx.json(patient))
  );

  const mockImmunizationGet = rest.get(
    "https://api.dev.zusapi.com/fhir/Immunization",
    (req, res, ctx) => res(ctx.status(200), ctx.json(immunizations))
  );

  return [mockPatientGet, mockImmunizationGet];
}

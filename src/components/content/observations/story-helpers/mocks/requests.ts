import { rest } from "msw";
import { patient } from "@/components/content/medications/story-helpers/mocks/patient";
import { createDiagnosticReportsBundle } from "@/components/content/observations/story-helpers/mocks/diagnostic-reports";

export function setupObservationMocks() {
  return {
    parameters: {
      msw: {
        handlers: { mocks: mockRequests() },
      },
    },
  };
}

function mockRequests() {
  const diagnosticReportsBundle = createDiagnosticReportsBundle();

  const mockPatientGet = rest.get(
    "https://api.dev.zusapi.com/fhir/Patient",
    // Add ctx.delay(750), delay to show loading, we set this to 750ms to be
    // less than the default testing-library timeout of 1000ms.
    (req, res, ctx) => res(ctx.delay(750), ctx.status(200), ctx.json(patient))
  );

  const mockDiagnosticReportGet = rest.get(
    "https://api.dev.zusapi.com/fhir/DiagnosticReport",
    (req, res, ctx) =>
      res(ctx.status(200), ctx.delay(250), ctx.json(diagnosticReportsBundle))
  );

  return [mockPatientGet, mockDiagnosticReportGet];
}

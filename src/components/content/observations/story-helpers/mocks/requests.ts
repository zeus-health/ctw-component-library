import { graphql, rest } from "msw";
import { diagnosticReport } from "./diagnostic-reports";
import { diagnosticReportFQS } from "./diagnostic-reports-fqs";
import { patient } from "./patient";
import { mockUnleashFQSEnabledGet } from "@/components/content/story-helpers/mocks/requests/requests";

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
  const mockUnleashGet = mockUnleashFQSEnabledGet("observations");

  const mockPatientGet = rest.get(
    "https://api.dev.zusapi.com/fhir/Patient",
    // Add ctx.delay(750), delay to show loading, we set this to 750ms to be
    // less than the default testing-library timeout of 1000ms.
    (req, res, ctx) => res(ctx.delay(750), ctx.status(200), ctx.json(patient))
  );

  // This GET returns the same observations for both builder and outside records
  const mockDiagnosticReportGet = rest.get(
    "https://api.dev.zusapi.com/fhir/DiagnosticReport",
    (req, res, ctx) => res(ctx.status(200), ctx.delay(250), ctx.json(diagnosticReport))
  );

  const mockDiagnosticReportFQSPost = graphql.query("DiagnosticReport", (_, res, ctx) =>
    res(ctx.delay(750), ctx.status(200), ctx.data(diagnosticReportFQS))
  );

  return [mockUnleashGet, mockPatientGet, mockDiagnosticReportGet, mockDiagnosticReportFQSPost];
}

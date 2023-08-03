import { graphql, rest } from "msw";
import { encounters } from "./encounters";
import { encountersFQS } from "./encounters-fqs";
import { medicationStatement } from "./medication-statement";
import { patient } from "./patient";
import { provenances } from "./provenances";
import { medicationDispense } from "../../../medications/story-helpers/mocks/medication-dispense";
import { medicationRequest } from "../../../medications/story-helpers/mocks/medication-request";
import { diagnosticReport } from "@/components/content/observations/story-helpers/mocks/diagnostic-reports";
import { diagnosticReportFQS } from "@/components/content/observations/story-helpers/mocks/diagnostic-reports-fqs";
import { mockUnleashFQSEnabledGet } from "@/components/content/story-helpers/mocks/requests/requests";

export function setupEncountersMocks() {
  return {
    parameters: {
      msw: { handlers: { mocks: mockRequests() } },
    },
  };
}

function mockRequests() {
  const mockUnleashGet = mockUnleashFQSEnabledGet("timeline");

  const mockPatientGet = rest.get(
    "https://api.dev.zusapi.com/fhir/Patient",
    // Add ctx.delay(750), delay to show loading, we set this to 750ms to be
    // less than the default testing-library timeout of 1000ms.
    (_, res, ctx) => res(ctx.delay(750), ctx.status(200), ctx.json(patient))
  );

  const mockEncounterGet = rest.get("https://api.dev.zusapi.com/fhir/Encounter", (_, res, ctx) =>
    res(ctx.status(200), ctx.json(encounters))
  );

  const mockMedicationRequestGet = rest.get(
    "https://api.dev.zusapi.com/fhir/MedicationRequest",
    (_, res, ctx) => res(ctx.status(200), ctx.json(medicationRequest))
  );

  const mockMedicationDispenseGet = rest.get(
    "https://api.dev.zusapi.com/fhir/MedicationDispense",
    (_, res, ctx) => res(ctx.status(200), ctx.json(medicationDispense))
  );

  const mockMedicationStatementGet = rest.get(
    "https://api.dev.zusapi.com/fhir/MedicationStatement",
    (_, res, ctx) => res(ctx.status(200), ctx.json(medicationStatement))
  );

  const mockProvenanceGet = rest.get(
    "https://api.dev.zusapi.com/fhir/Provenance?target=Encounter/:Encounter",
    async (_, res, ctx) => res(ctx.status(200), ctx.json(provenances))
  );

  const mockDiagnosticReportGet = rest.get(
    "https://api.dev.zusapi.com/fhir/DiagnosticReport",
    (req, res, ctx) => res(ctx.status(200), ctx.delay(250), ctx.json(diagnosticReport))
  );

  const mockDiagnosticReportFQSPost = graphql.query("DiagnosticReport", (_, res, ctx) =>
    res(ctx.delay(750), ctx.status(200), ctx.data(diagnosticReportFQS))
  );

  const mockEncountertFQSPost = graphql.query("Encounter", (_, res, ctx) =>
    res(ctx.delay(750), ctx.status(200), ctx.data(encountersFQS))
  );

  return [
    mockUnleashGet,
    mockPatientGet,
    mockEncounterGet,
    mockProvenanceGet,
    mockMedicationRequestGet,
    mockMedicationDispenseGet,
    mockMedicationStatementGet,
    mockDiagnosticReportGet,
    mockDiagnosticReportFQSPost,
    mockEncountertFQSPost,
  ];
}

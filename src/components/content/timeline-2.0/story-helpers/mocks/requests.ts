import { rest } from "msw";
import { medicationDispense } from "../../../medications/story-helpers/mocks/medication-dispense";
import { medicationRequest } from "../../../medications/story-helpers/mocks/medication-request";
import { encounters } from "../../../timeline/story-helpers/mocks/encounters";
import { patient } from "../../../timeline/story-helpers/mocks/patient";
import { provenances } from "../../../timeline/story-helpers/mocks/provenances";
import { medicationStatement } from "./medication-statement";
import { createDiagnosticReportsBundle } from "@/components/content/observations/story-helpers/mocks/diagnostic-reports";

export function setupTimelineMocks() {
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

  const mockEncounterGet = rest.get(
    "https://api.dev.zusapi.com/fhir/Encounter",
    (_, res, ctx) => res(ctx.status(200), ctx.json(encounters))
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
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.delay(250),
        ctx.json(createDiagnosticReportsBundle())
      )
  );

  return [
    mockPatientGet,
    mockEncounterGet,
    mockProvenanceGet,
    mockMedicationRequestGet,
    mockMedicationDispenseGet,
    mockMedicationStatementGet,
    mockDiagnosticReportGet,
  ];
}

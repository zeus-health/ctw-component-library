import { rest } from "msw";
import { medicationAdministration } from "./medication-administration";
import { medicationDispense } from "./medication-dispense";
import { medicationRequest } from "./medication-request";
import { otherProviderMedications } from "./other-provider-medications";
import { patient } from "./patient";
import { providerMedications } from "./provider-medications";

export function setupMedicationMocks() {
  return {
    parameters: {
      msw: [
        mockPatientGet,
        mockMedicationStatementGet,
        mockMedicationRequestGet,
        mockMedicationDispenseGet,
        mockMedicationAdministrationGet,
      ],
    },
  };
}

const mockPatientGet = rest.get(
  "https://api.dev.zusapi.com/fhir/Patient",
  // Add ctx.delay(750), delay to show loading, we set this to 750ms to be
  // less than the default testing-library timeout of 1000ms.
  (req, res, ctx) => res(ctx.delay(750), ctx.status(200), ctx.json(patient))
);

const mockMedicationStatementGet = rest.get(
  "https://api.dev.zusapi.com/fhir/MedicationStatement",
  (req, res, ctx) => {
    if (req.url.searchParams.get("_tag:not")) {
      return res(ctx.status(200), ctx.json(providerMedications));
    }
    return res(ctx.status(200), ctx.json(otherProviderMedications));
  }
);

const mockMedicationRequestGet = rest.get(
  "https://api.dev.zusapi.com/fhir/MedicationRequest",
  (req, res, ctx) => res(ctx.status(200), ctx.json(medicationRequest))
);

const mockMedicationDispenseGet = rest.get(
  "https://api.dev.zusapi.com/fhir/MedicationDispense",
  (req, res, ctx) => res(ctx.status(200), ctx.json(medicationDispense))
);

const mockMedicationAdministrationGet = rest.get(
  "https://api.dev.zusapi.com/fhir/MedicationAdministration",
  (req, res, ctx) => res(ctx.status(200), ctx.json(medicationAdministration))
);

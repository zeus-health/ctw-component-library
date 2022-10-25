import { find, sortBy, get } from "lodash";
import { findReference } from "./resource-helper";
import { SYSTEM_RXNORM } from "./system-urls";
import type { ResourceMap } from "./types";

export type Medication =
  | fhir4.MedicationStatement
  | fhir4.MedicationAdministration
  | fhir4.MedicationRequest
  | fhir4.MedicationDispense;

export type ClinicalStatus =
  | "active"
  | "entered-in-error"
  | "not-taken"
  | "completed"
  | "on-hold"
  | "intended"
  | "stopped";

// Hardcoded aliased display statuses for patient-reported statuses.
const medStatusDisplays: Record<ClinicalStatus, string> = {
  active: "Currently taking",
  "entered-in-error": "Never taken",
  "not-taken": "Prescribed, not taken",
  completed: "No longer taking",
  "on-hold": "On hold",
  intended: "Intend to take",
  stopped: "No longer taking",
};

// Medications can have either a medicationCodeableConcept or a
// medicationReference. This helper grabs the codeable concept
// from wherever it exists.
export function getMedicationCodeableConcept(
  medication: Medication,
  includedResources?: ResourceMap
): fhir4.CodeableConcept | undefined {
  if (medication.medicationCodeableConcept) {
    return medication.medicationCodeableConcept;
  }

  const medicationResource = findReference(
    "Medication",
    medication.contained,
    includedResources,
    medication.medicationReference?.reference
  );

  return medicationResource?.code;
}

export function getRxNormCode(
  medication: Medication,
  includedResources?: ResourceMap
): string | undefined {
  const codeableConcept = getMedicationCodeableConcept(
    medication,
    includedResources
  );

  return find(codeableConcept?.coding, {
    system: SYSTEM_RXNORM,
  })?.code;
}

// Returns the organization name of any performer for the medication.
export function getPerformingOrganization(
  resource: Medication,
  includedResources?: ResourceMap
): string | undefined {
  let reference;

  switch (resource.resourceType) {
    case "MedicationAdministration":
    case "MedicationDispense":
      reference = resource.performer?.[0]?.actor;
      break;

    case "MedicationRequest":
      reference = resource.performer || resource.dispenseRequest?.performer;
      break;

    // MedicationStatements don't have a performer.
    case "MedicationStatement":
    default:
      return undefined;
  }

  if (reference?.reference && reference.type === "Organization") {
    return findReference(
      "Organization",
      resource.contained,
      includedResources,
      reference.reference
    )?.name;
  }

  return undefined;
}

export function createPatientStatusMap(
  medications: fhir4.MedicationStatement[],
  includedResources?: ResourceMap
): Record<string, string> {
  let patientMedications = medications.filter(
    (medication) => medication.informationSource?.type === "Patient"
  );

  /* Sort the medications by asserted date, which we will then loop and
     set the last instance of whatever rxCode we see as the source of truth. */
  patientMedications = sortBy(patientMedications, (medication) =>
    medication.dateAsserted ? medication.dateAsserted : ""
  );

  const rxNormStatusMap: Record<string, string> = {};
  patientMedications.forEach((medication) => {
    const rxNormCode = getRxNormCode(medication, includedResources) ?? "";
    rxNormStatusMap[rxNormCode] = medication.status;
  });

  return rxNormStatusMap;
}

export function patientStatus(status?: string): string {
  return get(medStatusDisplays, status as string, "");
}

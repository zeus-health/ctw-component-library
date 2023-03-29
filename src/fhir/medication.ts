import type { ResourceMap } from "./types";
import { findReference } from "./resource-helper";
import { SYSTEM_ENRICHMENT, SYSTEM_RXNORM } from "./system-urls";
import { get, sortBy } from "@/utils/nodash";

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

// Returns the best RxNorm code for uniquely identifying a medication.
export function getIdentifyingRxNormCode(
  medication: Medication,
  includedResources?: ResourceMap
): string | undefined {
  return getIdentifyingRxNormCoding(medication, includedResources)?.code;
}

// Returns the best RxNorm code for uniquely identifying a medication.
export function getIdentifyingRxNormCoding(
  medication: Medication,
  includedResources?: ResourceMap
): fhir4.Coding | undefined {
  const codeableConcept = getMedicationCodeableConcept(
    medication,
    includedResources
  );

  // first check to see if the med has an RxNorm coding that wasn't provided via enrichment
  const rxNorm = codeableConcept?.coding?.find(
    (code) =>
      // must be an RxNorm code
      code.system === SYSTEM_RXNORM && code.extension === undefined
  );

  if (rxNorm) {
    return rxNorm;
  }

  // otherwise look for an RxNorm provided via the enrichment process
  return codeableConcept?.coding?.find(
    (code) =>
      // must be an RxNorm code
      code.system === SYSTEM_RXNORM &&
      // must have no extensions
      code.extension?.some(
        (e) =>
          e.url === SYSTEM_ENRICHMENT && e.valueString === "Standardization"
      )
  );
}

// Returns the best (most user friendly) display string for the medication associated with a medicationX resource
// Prefers the "identifying" RxNorm code display value, if Zus was able to determine one for the medication.
// Otherwise fall back to any display values.
export function getMedicationDisplayName(
  resource: Medication,
  includedResources?: ResourceMap
): string {
  const code = getIdentifyingRxNormCoding(resource, includedResources);
  if (code?.display) {
    return code.display;
  }

  const medCodeableConcept = getMedicationCodeableConcept(
    resource,
    includedResources
  );

  if (medCodeableConcept?.text) {
    return medCodeableConcept.text;
  }

  return (
    medCodeableConcept?.coding?.find((x) => x.display)?.display ??
    `${medCodeableConcept?.coding?.[0].code} (${medCodeableConcept?.coding?.[0].system})`
  );
}

// Returns the organization name of any performer for the medication.
export function getPerformingOrganization(
  resource: Medication,
  includedResources?: ResourceMap
): fhir4.Organization | undefined {
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
    );
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
    const rxNormCode =
      getIdentifyingRxNormCode(medication, includedResources) ?? "";
    rxNormStatusMap[rxNormCode] = medication.status;
  });

  return rxNormStatusMap;
}

export function patientStatus(status?: string): string {
  return get(medStatusDisplays, status as string, "");
}

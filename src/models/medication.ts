import { codeableConceptLabel } from "@/fhir/codeable-concept";
import { formatDateISOToLocal } from "@/fhir/formatters";
import type { Medication } from "@/fhir/medication";
import { getPerformingOrganization } from "@/fhir/medication";
import { findReference } from "@/fhir/resource-helper";
import type { ResourceMap } from "@/fhir/types";
import { PatientModel } from "./patients";

export class MedicationModel {
  readonly resource: Medication;

  readonly includedResources?: ResourceMap;

  constructor(medication: Medication, includedResources?: ResourceMap) {
    this.resource = medication;
    this.includedResources = includedResources;
  }

  get id(): string {
    return this.resource.id || "";
  }

  get resourceType(): string {
    return this.resource.resourceType;
  }

  get performer(): string | undefined {
    return getPerformingOrganization(this.resource, this.includedResources);
  }

  get status(): string {
    return this.resource.status;
  }

  get dosage(): string | undefined {
    switch (this.resource.resourceType) {
      case "MedicationStatement":
        return this.resource.dosage?.[0]?.text;
      case "MedicationAdministration":
        return this.resource.dosage?.text;
      case "MedicationDispense":
      case "MedicationRequest":
        return codeableConceptLabel(this.resource.dosageInstruction?.[0]);
      default:
        return "";
    }
  }

  get date(): string | undefined {
    switch (this.resource.resourceType) {
      case "MedicationStatement":
        return this.resource.dateAsserted;
      case "MedicationAdministration":
        return this.resource.effectivePeriod?.start;
      case "MedicationDispense":
        return this.resource.whenHandedOver;
      case "MedicationRequest":
        return this.resource.authoredOn;
      default:
        return "";
    }
  }

  get dateLocal(): string | undefined {
    return formatDateISOToLocal(this.date);
  }

  get patient(): PatientModel | undefined {
    const reference = findReference(
      "Patient",
      this.resource.contained,
      this.includedResources,
      this.resource.subject?.reference
    );

    if (reference) {
      return new PatientModel(reference, this.includedResources);
    }

    return undefined;
  }
}

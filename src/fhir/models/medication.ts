import { codeableConceptLabel } from "@/fhir/codeable-concept";
import { formatDateISOToLocal } from "@/fhir/formatters";
import type { Medication } from "@/fhir/medication";
import { getPerformingOrganization } from "@/fhir/medication";
import { MedicationAdministrationModel } from "@/fhir/models/medication-administration";
import { MedicationDispenseModel } from "@/fhir/models/medication-dispense";
import { MedicationRequestModel } from "@/fhir/models/medication-request";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import { findReference } from "@/fhir/resource-helper";
import { FHIRModel } from "./fhir-model";
import { PatientModel } from "./patient";

export class MedicationModel extends FHIRModel<Medication> {
  get performer(): string | undefined {
    return getPerformingOrganization(this.resource, this.includedResources)
      ?.name;
  }

  get status(): string {
    return this.resource.status;
  }

  get dosage(): string | undefined {
    switch (this.resource.resourceType) {
      case "MedicationStatement":
        return this.resource.dosage?.[0]?.text;
      case "MedicationAdministration":
        return new MedicationAdministrationModel(
          this.resource,
          this.includedResources
        ).dosageDisplay;
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
        return this.resource.whenHandedOver ?? this.resource.whenPrepared;
      case "MedicationRequest":
        return (
          this.resource.authoredOn ??
          this.resource.dosageInstruction?.[0].timing?.repeat?.boundsPeriod
            ?.start
        );
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

  /**
   * This accessor will try to get the prescriber for the underlying medication
   * models resource. Depending on the type of fhir resource, it will delegate
   * the work to a more specific fhir/model/*.ts class before simply grabbing
   * the `display` property from an actor/performer/requester. If all else
   * should fail, the accessor returns an empty string.
   */
  get prescriber(): string | undefined {
    switch (this.resource.resourceType) {
      case "MedicationStatement":
        return new MedicationStatementModel(
          this.resource,
          this.includedResources
        ).lastPrescriber;
      case "MedicationDispense":
        return new MedicationDispenseModel(
          this.resource,
          this.includedResources
        ).includedPerformer;
      case "MedicationRequest":
        return new MedicationRequestModel(this.resource, this.includedResources)
          .includedRequester;
      default:
        return undefined;
    }
  }
}

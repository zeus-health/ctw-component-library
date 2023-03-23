import { Resource } from "fhir/r4";
import { compact } from "lodash";
import { codeableConceptLabel } from "../codeable-concept";
import { formatDateISOToLocal } from "../formatters";
import { ResourceMap } from "../types";
import { DiagnosticReportModel } from "./diagnostic-report";
import { EncounterModel } from "./encounter";
import { FHIRModel } from "./fhir-model";
import { MedicationDispenseModel } from "./medication-dispense";
import { MedicationRequestModel } from "./medication-request";

export type TimelineEvent =
  | fhir4.Encounter
  | fhir4.DiagnosticReport
  | fhir4.MedicationRequest
  | fhir4.MedicationDispense;

export class TimelineEventModel extends FHIRModel<TimelineEvent> {
  public model:
    | EncounterModel
    | DiagnosticReportModel
    | MedicationRequestModel
    | MedicationDispenseModel;

  constructor(
    resource: TimelineEvent,
    includedResources?: ResourceMap,
    revIncludes?: Resource[]
  ) {
    super(resource, includedResources, revIncludes);
    switch (resource.resourceType) {
      case "Encounter":
        this.model = new EncounterModel(
          resource,
          includedResources,
          revIncludes
        );
        break;
      case "DiagnosticReport":
        this.model = new DiagnosticReportModel(
          resource,
          includedResources,
          revIncludes
        );
        break;
      case "MedicationRequest":
        this.model = new MedicationRequestModel(
          resource,
          includedResources,
          revIncludes
        );
        break;
      case "MedicationDispense":
        this.model = new MedicationDispenseModel(
          resource,
          includedResources,
          revIncludes
        );
        break;
      default:
        throw new Error("This resource is not in type TimelineEvent");
    }
  }

  get date() {
    if (this.model.constructor === EncounterModel) {
      return this.model.periodStart;
    }
    if (this.model.constructor === DiagnosticReportModel) {
      return this.model.effectiveStart;
    }
    if (this.model.constructor === MedicationRequestModel) {
      return formatDateISOToLocal(this.model.resource.authoredOn);
    }
    if (this.model.constructor === MedicationDispenseModel) {
      return formatDateISOToLocal(
        this.model.resource.whenHandedOver || this.model.resource.whenPrepared
      );
    }

    return undefined;
  }

  get type() {
    if (this.model.constructor === EncounterModel) {
      return "Encounter";
    }
    if (this.model.constructor === DiagnosticReportModel) {
      return "Diagnostic Report";
    }
    if (this.model.constructor === MedicationRequestModel) {
      return "Prescription";
    }
    if (this.model.constructor === MedicationDispenseModel) {
      return "Medication Fill";
    }

    return undefined;
  }

  get subtype() {
    if (this.model.constructor === EncounterModel) {
      return this.model.typeDisplay;
    }
    if (this.model.constructor === DiagnosticReportModel) {
      return this.model.category;
    }
    if (this.model.constructor === MedicationRequestModel) {
      return this.model.medicationDisplayName;
    }
    if (this.model.constructor === MedicationDispenseModel) {
      return this.model.medicationDisplayName;
    }

    return undefined;
  }

  get actor(): string[] {
    if (this.model.constructor === EncounterModel) {
      return compact([this.model.participants, this.model.location]);
    }
    if (this.model.constructor === DiagnosticReportModel) {
      return compact([this.model.performer]);
    }
    if (this.model.constructor === MedicationRequestModel) {
      return compact([this.model.includedRequester]);
    }
    if (this.model.constructor === MedicationDispenseModel) {
      return compact([
        this.model.performerDetails.name,
        this.model.performerDetails.address,
        this.model.performerDetails.telecom,
      ]);
    }

    return [];
  }

  get modifiers(): string[] {
    if (this.model.constructor === EncounterModel) {
      return compact(this.model.diagnoses);
    }
    if (this.model.constructor === DiagnosticReportModel) {
      return compact(this.model.results.map((r) => r.display));
    }
    if (this.model.constructor === MedicationRequestModel) {
      return compact([
        codeableConceptLabel(this.model.resource.dosageInstruction?.[0]),
      ]);
    }
    if (this.model.constructor === MedicationDispenseModel) {
      const daysSupply = this.model.resource.daysSupply?.value;
      const quantity = this.model.resource.quantity?.value;
      return compact([
        codeableConceptLabel(this.model.resource.dosageInstruction?.[0]),
        daysSupply ? `Days supply: ${daysSupply}` : "",
        quantity ? `Quantity: ${quantity}` : "",
      ]);
    }

    return [];
  }
}

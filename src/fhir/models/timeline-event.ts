import { Resource } from "fhir/r4";
import { codeableConceptLabel } from "../codeable-concept";
import { formatDateISOToLocal } from "../formatters";
import { ResourceMap } from "../types";
import { DiagnosticReportModel } from "./diagnostic-report";
import { EncounterModel } from "./encounter";
import { FHIRModel } from "./fhir-model";
import { MedicationDispenseModel } from "./medication-dispense";
import { MedicationRequestModel } from "./medication-request";
import { compact } from "@/utils/nodash";

export type TimelineEventResource =
  | fhir4.Encounter
  | fhir4.DiagnosticReport
  | fhir4.MedicationRequest
  | fhir4.MedicationDispense;

export class TimelineEventModel extends FHIRModel<TimelineEventResource> {
  kind = "TimelineEvent" as const;

  public model:
    | EncounterModel
    | DiagnosticReportModel
    | MedicationRequestModel
    | MedicationDispenseModel;

  constructor(
    resource: TimelineEventResource,
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
    switch (this.model.kind) {
      case "Encounter":
        return this.model.periodStart;
      case "DiagnosticReport":
        return this.model.effectiveStart;
      case "MedicationRequest":
        return formatDateISOToLocal(this.model.resource.authoredOn);
      case "MedicationDispense":
        return formatDateISOToLocal(
          this.model.resource.whenHandedOver || this.model.resource.whenPrepared
        );
      default:
        return undefined;
    }
  }

  get type() {
    switch (this.model.kind) {
      case "Encounter":
        return "Encounter";
      case "DiagnosticReport":
        return "Diagnostic Report";
      case "MedicationRequest":
        return "Prescription";
      case "MedicationDispense":
        return "Medication Fill";
      default:
        return undefined;
    }
  }

  get subtype() {
    switch (this.model.kind) {
      case "Encounter":
        return this.model.typeDisplay;
      case "DiagnosticReport":
        return this.model.category;
      case "MedicationRequest":
        return this.model.medicationDisplayName;
      case "MedicationDispense":
        return this.model.medicationDisplayName;
      default:
        return undefined;
    }
  }

  get actorDetails(): string[] {
    switch (this.model.kind) {
      case "Encounter":
        return compact([this.model.participants, this.model.location]);
      case "DiagnosticReport":
        return compact([this.model.performer]);
      case "MedicationRequest":
        return compact([this.model.includedRequester]);
      case "MedicationDispense":
        return compact([
          this.model.performerDetails.name,
          this.model.performerDetails.address,
          this.model.performerDetails.telecom,
        ]);
      default:
        return [];
    }
  }

  get modifiers(): string[] {
    switch (this.model.kind) {
      case "Encounter":
        return compact(this.model.diagnoses);
      case "DiagnosticReport":
        return [
          this.model.results.length > 0
            ? `${this.model.results.length} results available`
            : "",
        ];
      case "MedicationRequest":
        return compact([
          codeableConceptLabel(this.model.resource.dosageInstruction?.[0]),
        ]);
      case "MedicationDispense":
        return compact([
          codeableConceptLabel(this.model.resource.dosageInstruction?.[0]),
          this.model.resource.daysSupply?.value
            ? `Days supply: ${this.model.resource.daysSupply?.value}`
            : "",
          this.model.resource.quantity?.value
            ? `Quantity: ${this.model.resource.quantity?.value}`
            : "",
        ]);
      default:
        return [];
    }
  }
}

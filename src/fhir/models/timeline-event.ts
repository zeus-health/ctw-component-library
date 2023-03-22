import { Resource } from "fhir/r4";
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

  get eventDate() {
    if (this.model.constructor === EncounterModel) {
      return this.model.periodStart;
    }
    if (this.model.constructor === DiagnosticReportModel) {
      return this.model.effectiveStart;
    }
    if (this.model.constructor === MedicationRequestModel) {
      return this.model.resource.authoredOn;
    }
    if (this.model.constructor === MedicationDispenseModel) {
      return (
        this.model.resource.whenHandedOver || this.model.resource.whenPrepared
      );
    }

    return undefined;
  }

  get display() {
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
      return "Fill";
    }

    return undefined;
  }

  get eventSubtype() {
    if (this.model.constructor === EncounterModel) {
      return this.model.typeDisplay;
    }
    if (this.model.constructor === DiagnosticReportModel) {
      return this.model.category;
    }
    if (this.model.constructor === MedicationRequestModel) {
      return;
    }
    if (this.model.constructor === MedicationDispenseModel) {
      return "";
    }

    return undefined;
  }
}

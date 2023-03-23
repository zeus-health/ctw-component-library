import { Resource } from "fhir/r4";
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
      return "Fill";
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
      return compact([this.model.participants]);
    }
    if (this.model.constructor === DiagnosticReportModel) {
      return compact([this.model.performer]);
    }
    if (this.model.constructor === MedicationRequestModel) {
      return compact([this.model.prescriber]);
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
}

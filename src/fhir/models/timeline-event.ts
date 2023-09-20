import { DiagnosticReportModel } from "./diagnostic-report";
import { EncounterModel } from "./encounter";
import { FHIRModel } from "./fhir-model";
import { compact } from "@/utils/nodash";

export type TimelineEventResource = EncounterModel | DiagnosticReportModel;

export class TimelineEventModel extends FHIRModel<TimelineEventResource> {
  kind = "TimelineEvent" as const;

  public model: EncounterModel | DiagnosticReportModel;

  constructor(resource: TimelineEventResource) {
    super(resource);
    switch (resource.resourceType) {
      case "Encounter":
        this.model = resource;
        break;
      case "DiagnosticReport":
        this.model = resource;
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
      default:
        return undefined;
    }
  }

  get actorDetails(): string[] {
    switch (this.model.kind) {
      case "Encounter":
        return compact([this.model.participantsDisplay, this.model.location]);
      case "DiagnosticReport":
        return compact([this.model.performer]);
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
          this.model.results.length > 0 ? `${this.model.results.length} results available` : "",
        ];
      default:
        return [];
    }
  }
}

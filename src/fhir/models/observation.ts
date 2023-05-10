import { FHIRModel } from "./fhir-model";
import { codeableConceptLabel } from "@/fhir/codeable-concept";
import { formatDateISOToLocal } from "@/fhir/formatters";
import { compact } from "@/utils/nodash";

export class ObservationModel extends FHIRModel<fhir4.Observation> {
  kind = "Observation" as const;

  get category() {
    return codeableConceptLabel(this.resource.category?.[0]);
  }

  get display() {
    return codeableConceptLabel(this.resource.code);
  }

  get effectiveStart() {
    return formatDateISOToLocal(
      this.resource.effectivePeriod?.start || this.resource.effectiveDateTime
    );
  }

  get identifier() {
    return this.resource.identifier?.[0].value ?? "";
  }

  get performer() {
    return this.resource.performer?.[0].display;
  }

  get value() {
    return compact([this.resource.valueQuantity?.value, this.resource.valueQuantity?.unit]).join(
      ""
    );
  }

  get unit() {
    return this.resource.valueQuantity?.unit;
  }

  get valueString(): string | undefined {
    return this.resource.valueString;
  }

  get interpretation() {
    return codeableConceptLabel(this.resource.interpretation?.[0]);
  }

  get notes() {
    return this.resource.note?.[0].text ?? "";
  }

  get referenceRange() {
    return this.resource.referenceRange?.[0].text;
  }

  get acceptedInterpretations(): boolean {
    switch (codeableConceptLabel(this.resource.interpretation?.[0])) {
      case "N":
      case "NoInformation":
      case "normal":
      case "Normal":
      case "NA":
      case "(Normal)":
      case "unknown":
      case "not applicable":
      case "temporarily unavailable":
      case "NORMAL":
      case "NML":
      case "NORM":
      case "Unknown":
      case "*":
      case "Na":
        return false;
      default:
        return true;
    }
  }
}

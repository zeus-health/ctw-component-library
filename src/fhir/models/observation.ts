import { FHIRModel } from "./fhir-model";
import { codeableConceptLabel } from "@/fhir/codeable-concept";
import { formatDateISOToLocal } from "@/fhir/formatters";
import { compact } from "@/utils/nodash";

export class ObservationModel extends FHIRModel<fhir4.Observation> {
  get id() {
    return this.resource.id ?? "";
  }

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

  get performer() {
    return this.resource.performer?.[0].display;
  }

  get value() {
    return compact([
      this.resource.valueQuantity?.value,
      this.resource.valueQuantity?.unit,
    ]).join("");
  }

  get interpretation() {
    return codeableConceptLabel(this.resource.interpretation?.[0]);
  }

  get note() {
    return this.resource.note?.[0].text ?? "";
  }
}

import { FHIRModel } from "./fhir-model";
import { codeableConceptLabel } from "@/fhir/codeable-concept";
import { formatDateISOToLocal } from "@/fhir/formatters";
import { compact } from "@/utils/nodash";

export class ObservationModel extends FHIRModel<fhir4.Observation> {
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
    return compact([
      this.resource.valueQuantity?.value,
      this.resource.valueQuantity?.unit,
    ]).join("");
  }

  get interpretation() {
    return codeableConceptLabel(this.resource.interpretation?.[0]);
  }

  get notes() {
    return this.resource.note?.[0].text ?? "";
  }
}

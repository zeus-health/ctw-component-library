import { CodeableConcept, Coding } from "fhir/r4";
import { FHIRModel } from "./fhir-model";
import { codeableConceptLabel } from "@/fhir/codeable-concept";
import { formatDateISOToLocal } from "@/fhir/formatters";
import { compact } from "@/utils/nodash";

const standardizedLoincDisplay = (coding?: Coding[]) => {
  if (!coding) {
    return undefined;
  }

  return coding.find(
    (x) =>
      x.extension &&
      x.extension.find(
        (ext) =>
          ext.valueString === "LOINC Standardization" &&
          ext.url === "https://zusapi.com/terminology/enrichment"
      ) &&
      x.display
  );
};

const firstDisplay = (coding?: Coding[]): CodeableConcept | undefined => {
  if (!coding) {
    return undefined;
  }

  return coding.find((x) => x.display);
};

export class ObservationModel extends FHIRModel<fhir4.Observation> {
  kind = "Observation" as const;

  get category() {
    return codeableConceptLabel(this.resource.category?.[0]);
  }

  get display() {
    return (
      // use standardized loinc from enrichment
      standardizedLoincDisplay(this.resource.code.coding)?.display ||
      // then try the first valid display value from one of the codings
      firstDisplay(this.resource.code.coding) ||
      // finally use what's on the code.text
      codeableConceptLabel(this.resource.code)
    );
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

  get interpretation() {
    return codeableConceptLabel(this.resource.interpretation?.[0]);
  }

  get notes() {
    return this.resource.note?.[0].text ?? "";
  }
}

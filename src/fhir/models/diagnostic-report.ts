import { Coding } from "fhir/r4";
import { FHIRModel } from "./fhir-model";
import { codeableConceptLabel, findCodingByOrderOfPreference } from "@/fhir/codeable-concept";
import { formatDateISOToLocal } from "@/fhir/formatters";
import { findReference } from "@/fhir/resource-helper";
import { SYSTEM_DIAGNOSTIC_SERVICE_SECTION_ID, SYSTEM_SNOMED } from "@/fhir/system-urls";
import { find } from "@/utils/nodash";

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

const firstDisplay = (coding?: Coding[]): Coding | undefined => {
  if (!coding) {
    return undefined;
  }

  return coding.find((x) => x.display);
};

export class DiagnosticReportModel extends FHIRModel<fhir4.DiagnosticReport> {
  kind = "DiagnosticReport" as const;

  get category() {
    const category = codeableConceptLabel(this.resource.category?.[0]) || this.reportCategory;
    if (category) {
      return category;
    }

    const label = codeableConceptLabel(this.resource.category?.[0]);
    return (
      findReference(
        "Observation",
        undefined,
        this.includedResources,
        this.resource.result?.[0].reference
      )?.category ?? `No display value found ${label ? " for " : ""}${label}`
    );
  }

  get displayName() {
    return (
      standardizedLoincDisplay(this.resource.code.coding)?.display ||
      firstDisplay(this.resource.code.coding)?.display ||
      codeableConceptLabel(this.resource.code)
    );
  }

  get effectiveEnd() {
    if (this.resource.effectivePeriod?.end) {
      return formatDateISOToLocal(this.resource.effectivePeriod.end);
    }
    return this.effectiveStart;
  }

  get identifier() {
    return this.resource.identifier?.[0].value ?? "";
  }

  get effectiveStart() {
    return formatDateISOToLocal(
      this.resource.effectivePeriod?.start || this.resource.effectiveDateTime
    );
  }

  get performer() {
    return this.organization?.display || this.resource.performer?.[0].display;
  }

  get organization() {
    const performer = this.resource.performer ?? [];
    return find(performer, { type: "Organization" });
  }

  get reportCategory() {
    return (
      findCodingByOrderOfPreference(
        [{ system: SYSTEM_DIAGNOSTIC_SERVICE_SECTION_ID }, { system: SYSTEM_SNOMED }],
        this.resource.code
      )?.display ?? codeableConceptLabel(this.resource.code)
    );
  }

  get results() {
    return this.resource.result ?? [];
  }
}

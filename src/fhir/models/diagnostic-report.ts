import { FHIRModel } from "./fhir-model";
import {
  codeableConceptLabel,
  findCodingByOrderOfPreference,
} from "@/fhir/codeable-concept";
import { formatDateISOToLocal } from "@/fhir/formatters";
import {
  isNullFlavorSystem,
  NullFlavorSystem,
} from "@/fhir/mappings/null-flavor";
import { findReference } from "@/fhir/resource-helper";
import {
  SYSTEM_DIAGNOSTIC_SERVICE_SECTION_ID,
  SYSTEM_SNOMED,
} from "@/fhir/system-urls";
import { find, get } from "@/utils/nodash";

export class DiagnosticReportModel extends FHIRModel<fhir4.DiagnosticReport> {
  kind = "DiagnosticReport" as const;

  get category() {
    const category =
      codeableConceptLabel(this.resource.category?.[0]) || this.reportCategory;
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
    const { code } = this.resource;
    const value = codeableConceptLabel(code);

    if (isNullFlavorSystem(code.coding?.[0])) {
      return get(NullFlavorSystem, [value, "display"], "Unknown");
    }

    return value;
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
        [
          { system: SYSTEM_DIAGNOSTIC_SERVICE_SECTION_ID },
          { system: SYSTEM_SNOMED },
        ],
        this.resource.code
      )?.display ?? codeableConceptLabel(this.resource.code)
    );
  }

  get results() {
    return this.resource.result ?? [];
  }
}

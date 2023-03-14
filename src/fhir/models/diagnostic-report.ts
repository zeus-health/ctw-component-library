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
import { ObservationModel } from "@/fhir/models/observation";
import { findReference } from "@/fhir/resource-helper";
import {
  SYSTEM_DIAGNOSTIC_SERVICE_SECTION_ID,
  SYSTEM_SNOMED,
} from "@/fhir/system-urls";
import { find, get } from "@/utils/nodash";

export class DiagnosticReportModel extends FHIRModel<fhir4.DiagnosticReport> {
  get category() {
    const code = this.resource.category?.[0].coding?.[0];
    if (code) {
      return code.display ?? code.code;
    }
    const reportCategory =
      findCodingByOrderOfPreference(
        [
          { system: SYSTEM_DIAGNOSTIC_SERVICE_SECTION_ID },
          { system: SYSTEM_SNOMED },
        ],
        this.resource.code
      )?.display ?? codeableConceptLabel(this.resource.code);
    if (reportCategory) {
      return reportCategory;
    }
    const label = codeableConceptLabel(this.resource.category?.[0]);
    const fallback = `No display value found ${label ? " for " : ""}${label}`;
    const observation = findReference(
      "Observation",
      undefined,
      this.includedResources,
      this.resource.result?.[0].reference
    );
    if (observation) {
      return new ObservationModel(observation).category || fallback;
    }
    return fallback;
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

  get effectiveStart() {
    return formatDateISOToLocal(
      this.resource.effectivePeriod?.start || this.resource.effectiveDateTime
    );
  }

  get id() {
    return this.resource.id ?? "";
  }

  get performer() {
    return this.organization?.display || this.resource.performer?.[0].display;
  }

  get organization() {
    const performer = this.resource.performer ?? [];
    return find(performer, { type: "Organization" });
  }

  get results() {
    return this.resource.result ?? [];
  }
}

import { Coding } from "fhir/r4";
import { codeableConceptLabel } from "../codeable-concept";
import { formatDateISOToLocal } from "../formatters";
import { FHIRModel } from "./fhir-model";
import { isNullFlavorSystem } from "@/fhir/mappings/null-flavor";
import { compact, flatten } from "@/utils/nodash";

export class EncounterModel extends FHIRModel<fhir4.Encounter> {
  get class(): string | undefined {
    const { display, code } = this.resource.class;
    return display ?? code !== "UNK" ? code : undefined;
  }

  get diagnosis(): string | undefined {
    const diagnoses = compact(
      this.resource.diagnosis?.map((d) => d.condition.display)
    );
    return diagnoses.length ? diagnoses.join(", ") : undefined;
  }

  get dischargeDisposition(): string | undefined {
    return codeableConceptLabel(
      this.resource.hospitalization?.dischargeDisposition
    );
  }

  get location(): string | undefined {
    const locations = compact(
      this.resource.location?.map((l) => l.location.display)
    );
    return locations.length ? locations.join(", ") : undefined;
  }

  get participants(): string | undefined {
    const participants = compact(
      this.resource.participant?.map((p) => p.individual?.display)
    );
    return participants.length ? participants.join(", ") : undefined;
  }

  get periodEnd() {
    return formatDateISOToLocal(this.resource.period?.end);
  }

  get periodStart() {
    return formatDateISOToLocal(this.resource.period?.start);
  }

  get reason(): string | undefined {
    const reasons = compact(
      this.resource.reasonCode?.map((d) => codeableConceptLabel(d))
    );

    return reasons.length ? reasons.join(", ") : undefined;
  }

  get status() {
    return this.resource.status;
  }

  get typeCodings(): Coding[] {
    return compact(flatten(this.resource.type?.map((t) => t.coding)));
  }

  get typeDisplay(): string | undefined {
    const { display: classDisplay, system: classSystem } = this.resource.class;
    const classCode = (this.resource.class.code ?? "").toUpperCase();
    const firstTypeCoding = this.resource.type?.[0]?.coding?.[0] ?? {};
    const { text: typeText } = this.resource.type?.[0] ?? {};
    const typeCode = (firstTypeCoding.code ?? "").toUpperCase();

    // Grab our code and display, first from class if valid, otherwise from
    // first type coding.
    const isNullFlavor = isNullFlavorSystem(classSystem);
    const code = isNullFlavor ? typeCode : classCode;
    let display = isNullFlavor ? typeText : classDisplay;

    // Optionally add expanded version of the code
    // if code is AMB, IMP, EMER and display isn't already the expanded version.
    const mappings: Record<string, string> = {
      AMB: "Ambulatory",
      IMP: "Inpatient",
      EMER: "Emergency",
    };
    if (code && Object.keys(mappings).includes(code)) {
      const codeDisplay = mappings[code];
      if (!display) {
        return codeDisplay;
      }

      if (display.toLowerCase() !== codeDisplay.toLowerCase()) {
        display += `, ${mappings[code]}`;
      }
    }

    return display ?? "Unknown";
  }
}

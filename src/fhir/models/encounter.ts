import { Coding } from "fhir/r4";
import { codeableConceptLabel, findCoding } from "../codeable-concept";
import { formatDateISOToLocal } from "../formatters";
import { SYSTEM_ACT_CODE } from "../system-urls";
import { FHIRModel } from "./fhir-model";
import { compact, find, flatten } from "@/utils/nodash";

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
    const codeableConcept = find(this.resource.type, {
      coding: [{ system: SYSTEM_ACT_CODE }],
    });
    const coding = findCoding(SYSTEM_ACT_CODE, codeableConcept);
    return coding?.display || coding?.code;
  }
}

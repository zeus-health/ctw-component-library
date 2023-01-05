import { find } from "lodash";
import { findCoding } from "../codeable-concept";
import { formatDateISOToLocal } from "../formatters";
import { SYSTEM_ACT_CODE } from "../system-urls";
import { FHIRModel } from "./fhir-model";

export class EncounterModel extends FHIRModel<fhir4.Encounter> {
  get location(): string {
    return (
      this.resource.location?.map((l) => l.location.display).join(", ") ?? ""
    );
  }

  get participants(): string {
    return (
      this.resource.participant?.map((p) => p.individual?.display).join(", ") ??
      ""
    );
  }

  get periodStart() {
    return formatDateISOToLocal(this.resource.period?.start);
  }

  get type(): string | undefined {
    const codeableConcept = find(this.resource.type, {
      coding: [{ system: SYSTEM_ACT_CODE }],
    });
    const coding = findCoding(SYSTEM_ACT_CODE, codeableConcept);
    return coding?.display || coding?.code;
  }
}

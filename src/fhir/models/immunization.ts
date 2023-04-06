import { FHIRModel } from "./fhir-model";
import { findCoding } from "../codeable-concept";
import { formatDateISOToLocal } from "../formatters";
import { SYSTEM_CVX } from "../system-urls";

export class ImmunizationModel extends FHIRModel<fhir4.Immunization> {
  kind = "Immunization" as const;

  get description(): string | undefined {
    return this.resource.vaccineCode.text;
  }

  get cvxCode(): string | undefined {
    const cvxCoding = findCoding(SYSTEM_CVX, this.resource.vaccineCode);
    return cvxCoding?.code;
  }

  get occurrence(): string | undefined {
    if (this.resource.occurrenceDateTime) {
      return formatDateISOToLocal(this.resource.occurrenceDateTime);
    }

    return this.resource.occurrenceString;
  }
}

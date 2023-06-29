import { FHIRModel } from "./fhir-model";
import { findCoding } from "../codeable-concept";
import { formatDateISOToLocal } from "../formatters";
import { findReference } from "../resource-helper";
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

  get managingOrganization(): string | undefined {
    const organizationDisplay = findReference(
      "Patient",
      this.resource.contained,
      this.includedResources,
      this.resource.patient
    );

    const organizationName = findReference(
      "Organization",
      this.resource.contained,
      this.includedResources,
      organizationDisplay?.managingOrganization
    )?.name;

    return organizationDisplay?.managingOrganization?.display || organizationName;
  }
}

import { codeableConceptLabel } from "../codeable-concept";
import { formatDateISOToLocal } from "../formatters";
import { findReference } from "../resource-helper";
import { FHIRModel } from "./fhir-model";
import { PractitionerModel } from "./practitioner";

export class CareTeamModel extends FHIRModel<fhir4.CareTeam> {
  get status(): string | undefined {
    return this.resource.status;
  }

  get periodStart(): string | undefined {
    return formatDateISOToLocal(this.resource.period?.start);
  }

  get periodEnd(): string | undefined {
    return this.resource.period?.end;
  }

  get includedPerformer(): string | undefined {
    const reference = this.resource.participant?.[0]?.member?.reference;

    const practitioner = findReference(
      "Practitioner",
      this.resource.contained,
      this.includedResources,
      reference
    );

    if (practitioner) {
      return new PractitionerModel(practitioner).fullName;
    }
    return this.resource.participant?.[0]?.member?.display;
  }

  get careTeamTelecom(): string | undefined {
    return this.resource.telecom?.[0].value;
  }

  get managingOrganization(): string | undefined {
    return this.resource.participant?.[0].onBehalfOf?.display;
  }

  get role(): string | undefined {
    return codeableConceptLabel(this.resource.participant?.[0].role?.[0]);
  }

  get practitionerQualification(): string | undefined {
    const reference = this.resource.participant?.[0]?.member?.reference;

    const practitioner = findReference(
      "Practitioner",
      this.resource.contained,
      this.includedResources,
      reference
    );

    if (practitioner) {
      return codeableConceptLabel(
        new PractitionerModel(practitioner).resource.qualification?.[0].code
      );
    }
    return undefined;
  }
}

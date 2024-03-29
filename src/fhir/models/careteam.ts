import { FHIRModel } from "./fhir-model";
import { PractitionerModel } from "./practitioner";
import { codeableConceptLabel } from "../codeable-concept";
import { formatDateISOToLocal, formatPhoneNumber } from "../formatters";
import { findReference } from "../resource-helper";
import { find } from "@/utils/nodash";

export class CareTeamModel extends FHIRModel<fhir4.CareTeam> {
  kind = "CareTeam" as const;

  get categoryDisplay() {
    return codeableConceptLabel(this.resource.category ? this.resource.category[0] : undefined);
  }

  get status() {
    return this.resource.status;
  }

  get periodStart() {
    return formatDateISOToLocal(this.resource.period?.start);
  }

  get periodEnd() {
    return this.resource.period?.end;
  }

  get particpants() {
    return this.resource.participant;
  }

  get phone(): string | undefined {
    const phone = this.resource.telecom?.find((t) => t.system === "phone");
    return formatPhoneNumber(phone?.value);
  }

  get managingOrganization() {
    const behalfOf = find(this.resource.participant, "onBehalfOf")?.onBehalfOf?.display;
    return behalfOf;
  }

  get role() {
    return codeableConceptLabel(this.resource.participant?.[0].role?.[0]);
  }

  get practitionerQualification() {
    const reference = this.resource.participant?.[0]?.member;

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

  getPractitionerByID(reference: fhir4.Reference | undefined) {
    return findReference(
      "Practitioner",
      this.resource.contained,
      this.includedResources,
      reference
    );
  }
}

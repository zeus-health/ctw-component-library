import { CareTeamModel } from "./careteam";
import { FHIRModel } from "./fhir-model";
import { PractitionerModel } from "./practitioner";

export class CareTeamPractitionerModel extends FHIRModel<fhir4.Practitioner> {
  kind = "CareTeamPractitioner" as const;

  constructor(careTeam: CareTeamModel, practitioner: fhir4.Practitioner) {
    super(practitioner);
    this.careTeam = careTeam;
  }

  careTeam: CareTeamModel;

  get key() {
    return `${this.careTeam.id}_${this.id}`;
  }

  get practitionerName() {
    return new PractitionerModel(this.resource).fullName;
  }

  get effectiveStartDate() {
    return this.careTeam.periodStart;
  }

  get managingOrganization() {
    return this.careTeam.managingOrganization;
  }

  get role() {
    return this.careTeam.role;
  }

  get specialty() {
    return this.careTeam.practitionerQualification;
  }

  get telecom() {
    return this.careTeam.careTeamTelecom;
  }

  get status() {
    return this.careTeam.status;
  }
}

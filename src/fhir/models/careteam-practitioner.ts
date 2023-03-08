import { findReference } from "../resource-helper";
import { CareTeamModel } from "./careteam";
import { PractitionerModel } from "./practitioner";

export class CareTeamPractitionerModel {
  constructor(careTeam: CareTeamModel, practitionerID: string) {
    this.careTeam = careTeam;
    this.practitionerID = practitionerID;
  }

  careTeam: CareTeamModel;

  practitionerID: string;

  get PractitionerName() {
    const practitioner = findReference(
      "Practitioner",
      this.careTeam.resource.contained,
      this.careTeam.includedResources,
      this.practitionerID
    );

    if (practitioner) {
      return new PractitionerModel(practitioner).fullName;
    }
    return undefined;
  }

  get id() {
    return this.practitionerID.split("/").pop() ?? "";
  }

  get effectiveStartDate() {
    return this.careTeam.periodStart;
  }
}

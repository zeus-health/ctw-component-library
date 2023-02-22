import { FHIRModel } from "./fhir-model";

export class CareTeamModel extends FHIRModel<fhir4.CareTeam> {
  get status(): string | undefined {
    return this.resource.status;
  }
}

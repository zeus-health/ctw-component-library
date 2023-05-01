import { FHIRModel } from "./fhir-model";

export class PractitionerModel extends FHIRModel<fhir4.Practitioner> {
  kind = "Practitioner" as const;

  get fullName(): string {
    const firstEntryInName = this.resource.name?.[0];
    const givenName = firstEntryInName?.given?.length ? firstEntryInName.given[0] : "";

    return [givenName, firstEntryInName?.family].filter((n) => n).join(" ");
  }
}

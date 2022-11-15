export class PractitionerModel {
  private resource: fhir4.Practitioner;

  constructor(practitioner: fhir4.Practitioner) {
    this.resource = practitioner;
  }

  get id(): string {
    return this.resource.id || "";
  }

  get fullName(): string {
    const firstEntryInName = this.resource.name?.[0];
    const givenName = firstEntryInName?.given?.length
      ? firstEntryInName.given[0]
      : "";

    return [givenName, firstEntryInName?.family].filter((n) => n).join(" ");
  }
}

import { FHIRModel } from "./fhir-model";
import { codeableConceptLabel } from "../codeable-concept";
import { formatISODateStringToDate } from "../formatters";
import { findReference } from "../resource-helper";

export class DocumentModel extends FHIRModel<fhir4.DocumentReference> {
  kind = "Document" as const;

  get status(): string {
    return this.resource.status;
  }

  get binaryID(): string | undefined {
    const binaryID = this.resource.content[0].attachment.url;

    if (binaryID) {
      return binaryID.split("/").pop();
    }
    return undefined;
  }

  get docStatus(): string | undefined {
    return this.resource.docStatus;
  }

  get category(): fhir4.CodeableConcept[] | undefined {
    return this.resource.category;
  }

  // eslint-disable-next-line class-methods-use-this
  get resourceTypeTitle(): string {
    return "Document";
  }

  get title(): string | undefined {
    return this.resource.content[0].attachment.title;
  }

  get dateCreated(): string | undefined {
    return formatISODateStringToDate(
      this.resource.date || this.resource.content[0].attachment.creation
    );
  }

  get custodian(): string | undefined {
    const organizationName = findReference(
      "Organization",
      this.resource.contained,
      this.includedResources,
      this.resource.custodian
    )?.name;
    return this.resource.custodian?.display || organizationName;
  }

  get sectionDisplays(): string[] | undefined {
    return this.resource.category?.map((coding) => codeableConceptLabel(coding)) || undefined;
  }
}

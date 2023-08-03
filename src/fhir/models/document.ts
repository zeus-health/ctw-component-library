import { differenceInYears } from "date-fns";
import { FHIRModel } from "./fhir-model";
import { codeableConceptLabel } from "../codeable-concept";
import { formatISODateStringToDate } from "../formatters";
import { findReference } from "../resource-helper";

export class DocumentModel extends FHIRModel<fhir4.DocumentReference> {
  kind = "Document" as const;

  get status(): string {
    return this.resource.status;
  }

  get binaryId(): string | undefined {
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

  get noteTitle(): string | undefined {
    return this.resource.type?.coding?.[0].display;
  }

  get dateCreated(): string | undefined {
    return formatISODateStringToDate(
      this.resource.date || this.resource.content[0].attachment.creation
    );
  }

  get encounterDate(): string | undefined {
    const { start, end } = this.resource.context?.period || {};
    if (start && end) {
      const years = differenceInYears(new Date(end), new Date(start));
      if (years > 0) {
        // Omit if end - start >= 1 year.
        // This implies that it is a summary document.
        return undefined;
      }
      return formatISODateStringToDate(start);
    }

    if (end) {
      return formatISODateStringToDate(end);
    }
    return undefined;
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

  get text(): string | undefined {
    return this.resource.text?.div;
  }
}

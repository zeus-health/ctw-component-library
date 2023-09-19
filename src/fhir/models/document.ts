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
    // If there is more than 1 category then consider this a "top level"
    // document
    if (this.isTopLevelDocument) {
      return this.resource.content[0].attachment.title ?? this.resource.description;
    }

    // If it's not a top level document then try returning the label for the category.
    if (!!this.category && this.category.length > 0) {
      return codeableConceptLabel(this.category[0]);
    }

    // Fall back to the description
    return this.resource.description ?? "Unknown";
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

  get isTopLevelDocument(): boolean {
    return !!this.resource.category && this.resource.category.length > 1;
  }
}

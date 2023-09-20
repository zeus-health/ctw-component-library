import { FHIRModel } from "./fhir-model";
import { formatDateISOToLocal, formatISODateStringToDate } from "../formatters";
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
    if (this.resource.description) {
      return this.resource.description;
    }

    if (this.resource.content.length > 0 && this.resource.content[0].attachment.title) {
      return this.resource.content[0].attachment.title;
    }

    return "Unknown";
  }

  get dateCreated(): string | undefined {
    return formatISODateStringToDate(
      this.resource.date || this.resource.content[0].attachment.creation
    );
  }

  get isClinicalSummary(): boolean {
    return this.resource.type?.coding?.some((x) => x.code === "34133-9") ?? false;
  }

  get contextPeriodStartDate(): string | undefined {
    return formatDateISOToLocal(this.resource.context?.period?.start);
  }

  get contextPeriodEndDate(): string | undefined {
    return formatDateISOToLocal(this.resource.context?.period?.end);
  }

  get encounterDate(): string | undefined {
    if (this.isClinicalSummary) {
      return undefined;
    }

    const start = this.contextPeriodStartDate;
    const end = this.contextPeriodEndDate;

    if (start && end && start !== end) {
      return `${start} - ${end}`;
    }

    if (start) {
      return start;
    }

    if (end) {
      return end;
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

  get text(): string | undefined {
    return this.resource.text?.div;
  }

  get isTopLevelDocument(): boolean {
    return !!this.resource.category && this.resource.category.length > 1;
  }
}

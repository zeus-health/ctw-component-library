import { codeableConceptLabel } from "../codeable-concept";
import { formatISODateStringToDate } from "../formatters";
import { FHIRModel } from "./fhir-model";

export class DocumentModel extends FHIRModel<fhir4.DocumentReference> {
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

  get title(): string | undefined {
    return this.resource.content[0].attachment.title;
  }

  get dateCreated(): string | undefined {
    return formatISODateStringToDate(
      this.resource.content[0].attachment.creation
    );
  }

  get managingOrganization(): string | undefined {
    return this.resource.custodian?.display;
  }

  get SectionDisplays(): string[] | undefined {
    return (
      this.resource.category?.map((coding) => codeableConceptLabel(coding)) ||
      undefined
    );
  }
}

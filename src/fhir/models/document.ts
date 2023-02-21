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
}

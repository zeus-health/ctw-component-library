import { FHIRModel } from "./fhir-model";

export class DocumentModel extends FHIRModel<fhir4.DocumentReference> {
  get status(): string {
    return this.resource.status;
  }
}

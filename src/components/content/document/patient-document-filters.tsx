import { DocumentModel } from "@/fhir/models/document";
import { isEqual, uniqWith } from "@/utils/nodash";

export const applyDocumentFilters = (data: fhir4.DocumentReference[]) => {
  const documentModel = data.map((document) => new DocumentModel(document));
  const documentData = uniqWith(documentModel, (a, b) =>
    isEqual(valuesToDedupeOn(a), valuesToDedupeOn(b))
  );

  return documentData;
};

const valuesToDedupeOn = (document: DocumentModel) => [
  document.dateCreated,
  document.custodian,
  document.title,
];

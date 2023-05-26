import { DocumentModel } from "@/fhir/models/document";
import { isEqual, uniqWith } from "@/utils/nodash";

export const applyDocumentFilters = (data: fhir4.DocumentReference[]) => {
  const documentModel = data.map((document) => new DocumentModel(document));

  const actualDocument = documentModel.filter(
    (document) =>
      document.category &&
      document.category.length > 1 &&
      document.category.filter((category) => category.coding).length > 0
  );

  const documentData = uniqWith(actualDocument, (a, b) =>
    isEqual(valuesToDedupeOn(a), valuesToDedupeOn(b))
  );

  return documentData;
};

const valuesToDedupeOn = (document: DocumentModel) => [
  document.dateCreated,
  document.custodian,
  document.title,
];

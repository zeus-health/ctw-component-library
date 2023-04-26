import { DocumentModel } from "@/fhir/models/document";
import { isEqual, uniqWith } from "@/utils/nodash";

export const applyDocumentFilters = (data: fhir4.DocumentReference[]) => {
  const documentModel = data.map((document) => new DocumentModel(document));

  const actualDocument = documentModel.filter(
    (document) =>
      document.category &&
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      document.category.filter(
        (category) => category.coding && category.coding.length > 1
      )
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

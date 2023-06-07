import { DocumentModel } from "@/fhir/models/document";
import { isEqual, uniqWith } from "@/utils/nodash";

const RAINBOW_CUTOVER_DATE = new Date("2023-03-08T05:00:00.000Z");

const zusCreationDate = (doc: fhir4.DocumentReference) => {
  const createExtension = doc.meta?.extension?.filter(
    (ext) => ext.url === "https://zusapi.com/created-at"
  );
  if (createExtension?.length !== 1 || !createExtension[0].valueInstant) {
    throw Error("no creation date found for document reference");
  }

  return new Date(createExtension[0].valueInstant);
};

const isViewablePreRainbow = (doc: fhir4.DocumentReference) =>
  zusCreationDate(doc) < RAINBOW_CUTOVER_DATE;

const isViewablePostRainbow = (docRef: fhir4.DocumentReference) => {
  const document = new DocumentModel(docRef);

  return (
    document.category &&
    document.category.length > 1 &&
    document.category.filter((category) => category.coding).length > 0
  );
};

export const applyDocumentFilters = (data: fhir4.DocumentReference[]) => {
  const documentModels = data
    .filter((doc) => isViewablePreRainbow(doc) || isViewablePostRainbow(doc))
    .map((document) => new DocumentModel(document));

  const documentData = uniqWith(documentModels, (a, b) =>
    isEqual(valuesToDedupeOn(a), valuesToDedupeOn(b))
  );

  return documentData;
};

const valuesToDedupeOn = (document: DocumentModel) => [
  document.dateCreated,
  document.custodian,
  document.title,
];

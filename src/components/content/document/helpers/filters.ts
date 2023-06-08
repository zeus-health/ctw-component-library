import { DocumentModel } from "@/fhir/models/document";
import { isEqual, uniqWith } from "@/utils/nodash";

export const THIRD_PARTY_SOURCE_SYSTEM = "https://zusapi.com/thirdparty/source";
export const ZUS_CREATION_DATE_URL = "https://zusapi.com/created-at";
const RAINBOW_CUTOVER_DATE = new Date("2023-03-08T05:00:00.000Z");

const zusCreationDate = (doc: fhir4.DocumentReference) => {
  const createExtension = doc.meta?.extension?.filter((ext) => ext.url === ZUS_CREATION_DATE_URL);
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

const isRenderableBinary = (doc: fhir4.DocumentReference): boolean => {
  const thirdPartyTag = doc.meta?.tag?.find((tag) => tag.system === THIRD_PARTY_SOURCE_SYSTEM);
  const isSupportedThirdParty = ["commonwell", "carequality"].includes(thirdPartyTag?.code || "");
  return isSupportedThirdParty;
};

export const applyDocumentFilters = (data: fhir4.DocumentReference[]) => {
  const documentModels = data
    .filter(
      (doc) => (isViewablePreRainbow(doc) || isViewablePostRainbow(doc)) && isRenderableBinary(doc)
    )
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

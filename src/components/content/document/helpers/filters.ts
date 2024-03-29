import { EmptyNotes } from "./empty-notes";
import { dismissFilter } from "../../resource/filters";
import { isRenderableBinary } from "../../resource/helpers/filters";
import { FilterChangeEvent, FilterItem } from "@/components/core/filter-bar/filter-bar-types";
import { DocumentModel } from "@/fhir/models/document";
import { isEqual, uniqWith } from "@/utils/nodash";

export const ZUS_CREATION_DATE_URL = "https://zusapi.com/created-at";
const RAINBOW_CUTOVER_DATE = new Date("2023-03-08T05:00:00.000Z");

const zusCreationDate = (doc: fhir4.DocumentReference) => {
  const createExtension = doc.meta?.extension?.filter((ext) => ext.url === ZUS_CREATION_DATE_URL);
  if (createExtension?.length !== 1 || !createExtension[0].valueInstant) {
    return null;
  }

  return new Date(createExtension[0].valueInstant);
};

const isViewablePreRainbow = (doc: fhir4.DocumentReference) => {
  const creationDate = zusCreationDate(doc);

  // if we cannot determine the date, default to trying to show the document
  if (!creationDate) {
    return true;
  }
  return creationDate < RAINBOW_CUTOVER_DATE;
};

// DA creates document references for sections of a CDA and the full CDA.
// We want to filter out the ones for sections, luckily those
// will have at most 1 category.
const isViewablePostRainbow = (docRef: fhir4.DocumentReference) => {
  const document = new DocumentModel(docRef);

  return (
    document.category &&
    document.category.length > 1 &&
    document.category.filter((category) => category.coding).length > 0
  );
};

// DA creates document references for sections of a CDA and the full CDA.
// Sections will have at most 1 category.
export function isSectionDocument(document: DocumentModel) {
  return document.category && document.category.length < 2;
}

// isEmptyClinicalNote is used to filter out empty clinical notes
// where the note text is null or empty string or
// is less than 500 chars and contains one of the substrings in EmptyNotes
export function isEmptyClinicalNote(document: DocumentModel) {
  const noteText = document.text;
  if (!noteText) {
    return true;
  }

  return EmptyNotes.some((emptyNoteStr) => {
    if (noteText.length < 500 && noteText.toLowerCase().includes(emptyNoteStr)) {
      return true;
    }
    return false;
  });
}

export const applyDocumentFilters = (data: DocumentModel[]) => {
  const documentModels = data.filter(
    (doc) =>
      (isViewablePreRainbow(doc.resource) || isViewablePostRainbow(doc.resource)) &&
      isRenderableBinary(doc.resource)
  );

  const documentData = uniqWith(documentModels, (a, b) =>
    isEqual(valuesToDedupeOn(a), valuesToDedupeOn(b))
  );

  return documentData;
};

const valuesToDedupeOn = (document: DocumentModel) => [
  document.encounterDate,
  document.dateCreated,
  document.custodian,
  document.title,
];

export function documentsFilter(): FilterItem[] {
  const filters: FilterItem[] = [dismissFilter];
  return filters;
}

export const defaultDocumentsFilters: FilterChangeEvent = {};

import { LabelValueType } from "../../../types";
import { getAuthor } from "./getAuthor";
import { getConsent } from "./getConsent";
import { getDocumentationOf } from "./getDocumentationOf";
import { getEncounter } from "./getEncounter";
import { getInFulfillmentOf } from "./getInFulfillmentOf";
import { getPatient } from "./getPatient";
import { getTitle } from "./getTitle";

export const getHeaderData = (
  document: Document
): { title: string; labelTypeData: Record<string, LabelValueType[]> } => {
  const title = getTitle(document);
  const patient = getPatient(document);
  const documentationOf = getDocumentationOf(document);
  const author = getAuthor(document);
  const encounter = getEncounter(document);
  const inFulfillmentOf = getInFulfillmentOf(document);
  const consents = getConsent(document);

  return {
    title,
    labelTypeData: {
      ...patient,
      ...(consents || {}),
      ...(documentationOf || {}),
      ...(author || {}),
      encounter: encounter || [],
      ...(inFulfillmentOf || {}),
    },
  };
};

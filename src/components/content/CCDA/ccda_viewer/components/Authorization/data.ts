import { getConsent as getConsentDataFromHeader } from "../Header/data/getConsent";

export const getAuthorizationData = (document: Document) => {
  const inFulfillmentOf = getConsentDataFromHeader(document);

  return Object.values(inFulfillmentOf || {});
};

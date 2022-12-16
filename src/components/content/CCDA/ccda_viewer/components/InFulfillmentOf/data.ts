import { getInFulfillmentOf as getInFulfillmentOfDataFromHeader } from "../Header/data/getInFulfillmentOf";

export const getInFulfillmentOfData = (document: Document) => {
  const inFulfillmentOf = getInFulfillmentOfDataFromHeader(document);

  return Object.values(inFulfillmentOf || {});
};

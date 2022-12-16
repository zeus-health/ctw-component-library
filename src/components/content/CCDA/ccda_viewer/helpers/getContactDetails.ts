import { getAddress } from "./getAddress";
import { getTelecom } from "./getTelecom";

export const getContactDetails = (
  addressXml: Document | Document[],
  telecomXml: Document | Document[]
): string => {
  const address = getAddress(addressXml);
  const telecom = getTelecom(telecomXml);

  return `${address || ""}${address && telecom ? "\n" : ""}${telecom || ""}`;
};

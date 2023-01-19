import { ModifiedAddress } from "../types";
import { capitalize, isArray, isEmpty } from "@/utils/nodash";

const addressParser = (addr: ModifiedAddress) => {
  if (addr.text) return addr.text;
  let result = "";

  result += addr.use ? `${capitalize(addr.use)}: ` : "";
  result += !isEmpty(addr.line) ? `${addr.line?.join("\n")}\n` : "";
  result += addr.city ? `${addr.city}, ` : "";
  result += addr.state ? `${addr.state} ` : "";
  result += addr.postalCode || "";
  result += addr.country ? `\n${addr.country}` : "";

  return result;
};

export const displayForAddress = (
  address: ModifiedAddress | ModifiedAddress[]
): string => {
  if (isEmpty(address)) return "";

  if (isArray(address)) return address.map(addressParser).join("\n");

  return addressParser(address);
};

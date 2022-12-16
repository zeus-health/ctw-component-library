import { isArray } from "lodash";
import xpath from "xpath";
import { ModifiedAddress } from "../types";
import { displayForAddress } from "./displayForAddress";
import { parseMany } from "./parseMany";

export const addressUseMap: Record<string, string> = {
  BAD: "bad",
  DIR: "direct",
  H: "home",
  HP: "primary home",
  HV: "vacation home",
  PHYS: "physical",
  PST: "postal",
  PUB: "public",
  TMP: "temporary",
  WP: "work",
  CONF: "confidential",
};

export const getAddress = (address: Document | Document[]): string => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!address) return "";

  const parser = (addressXml: Document) => {
    const use = String(xpath.select1("string(@use)", addressXml));

    const addr: ModifiedAddress = {
      line: parseMany<string>(
        (l) => String(xpath.select("string(text())", l)),
        xpath.select("*[name()='streetAddressLine']", addressXml) as Document[]
      ).filter(Boolean),
      city: String(xpath.select("string(*[name()='city'])", addressXml)),
      state: String(xpath.select("string(*[name()='state'])", addressXml)),
      postalCode: String(
        xpath.select("string(*[name()='postalCode'])", addressXml)
      ),
      country: String(xpath.select("string(*[name()='country'])", addressXml)),
      use: addressUseMap[use],
    };

    return displayForAddress(addr);
  };

  if (isArray(address)) return address.map(parser).join("\n");

  return parser(address);
};

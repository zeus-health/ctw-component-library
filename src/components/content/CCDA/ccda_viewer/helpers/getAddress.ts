import xpath from "xpath";
import { displayForAddress } from "./displayForAddress";
import { ModifiedAddress } from "../types";
import { isArray, map } from "@/utils/nodash";

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

export const getAddress = (address: Document | Document[] | undefined): string => {
  if (!address) return "";

  const parser = (addressXml: Document) => {
    const use = String(xpath.select1("string(@use)", addressXml));

    const addr: ModifiedAddress = {
      line: map(xpath.select("*[name()='streetAddressLine']", addressXml) as Document[], (l) =>
        String(xpath.select("string(text())", l))
      ).filter(Boolean),
      city: String(xpath.select("string(*[name()='city'])", addressXml)),
      state: String(xpath.select("string(*[name()='state'])", addressXml)),
      postalCode: String(xpath.select("string(*[name()='postalCode'])", addressXml)),
      country: String(xpath.select("string(*[name()='country'])", addressXml)),
      use: addressUseMap[use],
    };

    return displayForAddress(addr);
  };

  if (isArray(address)) return address.map(parser).join("\n");

  return parser(address);
};

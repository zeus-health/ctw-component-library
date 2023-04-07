import xpath from "xpath";
import { displayForTelecom } from "./displayForTelecom";
import { ModifiedContactPoint } from "../types";
import { isArray } from "@/utils/nodash";

export const contactPointUseMap: Record<string, string> = {
  BAD: "bad",
  CONF: "confidential",
  OLD: "old",
  H: "home",
  HP: "primary home",
  HV: "vacation Home",
  TMP: "temporary",
  WP: "work",
  DIR: "direct",
  PUB: "public",
  AS: "answering service",
  EC: "emergency:",
  MC: "mobile",
  PG: "pager",
};

export const contactPointTelecomMap: Record<string, string> = {
  tel: "phone",
  mailto: "email",
};

export const getTelecom = (telecom?: Document | Document[]): string => {
  if (!telecom) return "";

  const parser = (telecomXml: Document) => {
    const valueFromTag = String(xpath.select1("string(@value)", telecomXml));

    const splitValue = valueFromTag.split(":");

    let system;
    let value;
    if (splitValue.length === 2) [system, value] = splitValue;

    if (splitValue.length === 1) [value] = splitValue;

    if (!value) return "";

    const backupSystem = value.includes("@")
      ? contactPointTelecomMap.mailto
      : contactPointTelecomMap.tel;

    const finalSystem =
      contactPointTelecomMap[system as string] || backupSystem;

    const contactPoint: ModifiedContactPoint = {
      system: finalSystem,
      value,
      use: contactPointUseMap[
        String(xpath.select1("string(@use)", telecomXml))
      ],
    };
    return displayForTelecom(contactPoint);
  };

  if (isArray(telecom)) return telecom.map(parser).join("\n");

  return parser(telecom);
};

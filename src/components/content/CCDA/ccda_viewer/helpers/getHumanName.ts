import xpath from "xpath";
import { displayForName } from "./displayForName";
import { ModifiedHumanName } from "../types";
import { isArray, map } from "@/utils/nodash";

const humanNameUseMap: Record<string, string> = {
  A: "Artist/Stage",
  ABC: "Alphabetic",
  ASGN: "Assigned",
  C: "License",
  I: "Indigenous/Tribal",
  IDE: "Ideographic",
  L: "Legal",
  P: "Pseudonym",
  PHON: "Phonetic",
  R: "Religious",
  SNDX: "Soundex",
  SRCH: "Search",
  SYL: "Syllabic",
};

export const getHumanName = (name?: Document | Document[]): string => {
  if (!name) return "";

  const parser = (nameXml: Document) => {
    const patientParsedName: ModifiedHumanName = {
      use: humanNameUseMap[String(xpath.select("string(@use)", nameXml))],
      given: map(xpath.select("(*[name()='given'])", nameXml) as Document[], (n) =>
        String(xpath.select1("string(text())", n))
      ),
      family: String(xpath.select1("string(*[name()='family']/text())", nameXml)),
      prefix: map(xpath.select("(*[name()='prefix'])", nameXml) as Document[], (n) =>
        String(xpath.select1("string(text())", n))
      ),
      suffix: map(xpath.select("(*[name()='suffix'])", nameXml) as Document[], (n) =>
        String(xpath.select1("string(text())", n))
      ),
    };
    return displayForName(patientParsedName);
  };

  if (isArray(name)) return name.map(parser).join("\n");

  return parser(name);
};

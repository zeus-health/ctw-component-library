import { isArray } from "lodash";
import xpath from "xpath";
import { ModifiedHumanName } from "../types";
import { displayForName } from "./displayForName";
import { parseMany } from "./parseMany";

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

export const getHumanName = (name: Document | Document[]): string => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!name) return "";

  const parser = (nameXml: Document) => {
    const patientParsedName: ModifiedHumanName = {
      use: humanNameUseMap[String(xpath.select("string(@use)", nameXml))],
      given: parseMany<string>(
        (n) => String(xpath.select1("string(text())", n)),
        xpath.select("(*[name()='given'])", nameXml) as Document[]
      ),
      family: String(
        xpath.select1("string(*[name()='family']/text())", nameXml)
      ),
      prefix: parseMany<string>(
        (n) => String(xpath.select1("string(text())", n)),
        xpath.select("(*[name()='prefix'])", nameXml) as Document[]
      ),
      suffix: parseMany<string>(
        (n) => String(xpath.select1("string(text())", n)),
        xpath.select("(*[name()='suffix'])", nameXml) as Document[]
      ),
    };
    return displayForName(patientParsedName);
  };

  if (isArray(name)) return name.map(parser).join("\n");

  return parser(name);
};

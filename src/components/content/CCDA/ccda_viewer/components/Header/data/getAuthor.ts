import xpath from "xpath";
import { getHumanName, parseToISOString } from "../../../helpers";
import { LabelValueType } from "../../../types";
import { isEmpty } from "@/utils/nodash";

export const getAuthor = (
  document: Document
): Record<string, LabelValueType[]> | undefined => {
  const authors = xpath.select(
    "*[name()='ClinicalDocument']/*[name()='author']",
    document
  ) as Document[];

  if (isEmpty(authors)) return undefined;

  const result = authors.map((author): LabelValueType[] => {
    const personName = xpath.select1(
      "*[name()='assignedAuthor']/*[name()='assignedPerson']/*[name()='name']",
      author
    ) as Document | undefined;
    const deviceName = xpath.select1(
      "*[name()='assignedAuthor']/*[name()='assignedAuthoringDevice']",
      author
    ) as Document | undefined;

    let name = "";

    if (personName) name = getHumanName(personName);
    else if (deviceName) {
      const manufacturerModelName = String(
        xpath.select1("string(*[name()='manufacturerModelName'])", deviceName)
      );
      const softwareName = String(
        xpath.select1("string(*[name()='softwareName'])", deviceName)
      );

      name = [manufacturerModelName, softwareName].filter(Boolean).join("; ");
    }
    const representedOrganizationName = String(
      xpath.select1(
        "string(*[name()='assignedAuthor']/*[name()='representedOrganization']/*[name()='name'])",
        author
      )
    );

    const authoredOn = parseToISOString(
      String(xpath.select1("string(*[name()='time'])", author))
    );

    return [
      { label: "Name:", value: name },
      { label: "Organization:", value: representedOrganizationName },
      { label: "Authored on", value: authoredOn },
    ];
  });

  return result.reduce(
    (acc, val, index) => ({ ...acc, [`author${index + 1}`]: val }),
    {}
  );
};

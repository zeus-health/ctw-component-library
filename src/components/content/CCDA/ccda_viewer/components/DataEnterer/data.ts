import xpath from "xpath";
import { getContactDetails, getHumanName } from "../../helpers";
import { GeneralInfo } from "../../types";

export const getDataEntererData = (
  document: Document
): GeneralInfo | undefined => {
  const dataEnterer = xpath.select1(
    "*[name()='ClinicalDocument']/*[name()='dataEnterer']/*[name()='assignedEntity']",
    document
  ) as Document;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!dataEnterer) return undefined;

  const assignedPerson = xpath.select1(
    "*[name()='assignedPerson']",
    dataEnterer
  ) as Document;

  const name = getHumanName(
    xpath.select("*[name()='name']", assignedPerson) as Document[]
  );

  const contactDetails = getContactDetails(
    xpath.select("*[name()='addr']", dataEnterer) as Document[],
    xpath.select("*[name()='telecom']", dataEnterer) as Document[]
  );

  return { name, contactDetails };
};

import xpath from "xpath";
import {
  formatDate,
  getContactDetails,
  getHumanName,
  parseToISOString,
} from "../../helpers";
import { ExtendedGeneralInfo } from "../../types";

export const getLegalAuthenticatorData = (
  document: Document
): ExtendedGeneralInfo | undefined => {
  const legalAuthenticator = xpath.select1(
    "*[name()='ClinicalDocument']/*[name()='legalAuthenticator']",
    document
  ) as Document;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!legalAuthenticator) return undefined;

  const assignedEntity = xpath.select1(
    "*[name()='assignedEntity']",
    legalAuthenticator
  ) as Document;

  const assignedPerson = xpath.select1(
    "*[name()='assignedPerson']",
    assignedEntity
  ) as Document;

  const name = getHumanName(
    xpath.select("*[name()='name']", assignedPerson) as Document[]
  );

  const contactDetails = getContactDetails(
    xpath.select("*[name()='addr']", assignedEntity) as Document[],
    xpath.select("*[name()='telecom']", assignedEntity) as Document[]
  );

  const time = formatDate(
    parseToISOString(
      String(
        xpath.select1("string(*[name()='time']/@value)", legalAuthenticator)
      )
    )
  );

  return { name, contactDetails, time };
};

import { isEmpty } from "lodash";
import xpath from "xpath";
import {
  getContactDetails,
  getHumanName,
  parseToISOString,
} from "../../helpers";
import { ExtendedGeneralInfo, isExtendedGeneralInfoExist } from "../../types";

export const getAuthenticatorData = (
  document: Document
): ExtendedGeneralInfo[] | undefined => {
  const authenticators = xpath.select(
    "*[name()='ClinicalDocument']/*[name()='authenticator']",
    document
  ) as Document[];

  if (isEmpty(authenticators)) return undefined;

  return authenticators
    .map((authenticator): ExtendedGeneralInfo | undefined => {
      const assignedEntity = xpath.select1(
        "*[name()='assignedEntity']",
        authenticator
      ) as Document | undefined;

      if (!assignedEntity) return undefined;

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

      const time = parseToISOString(
        String(xpath.select1("string(*[name()='time']/@value)", authenticator))
      );

      return { name, contactDetails, time };
    })
    .filter(isExtendedGeneralInfoExist);
};

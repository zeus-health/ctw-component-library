import { isEmpty } from "lodash";
import xpath from "xpath";
import { getContactDetails, getHumanName } from "../../helpers";
import { ExtendedGeneralInfo, isExtendedGeneralInfoExist } from "../../types";

export const getInformantData = (
  document: Document
): ExtendedGeneralInfo[] | undefined => {
  const informants = xpath.select(
    "*[name()='ClinicalDocument']/*[name()='informant']",
    document
  ) as Document[];

  if (isEmpty(informants)) return undefined;

  return informants
    .map((informant): ExtendedGeneralInfo | undefined => {
      const assignedEntity = xpath.select1(
        "*[name()='assignedEntity']",
        informant
      ) as Document | undefined;

      if (assignedEntity) {
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

        return { name, contactDetails, relationship: "" };
      }

      const relatedEntity = xpath.select1(
        "*[name()='relatedEntity']",
        informant
      ) as Document | undefined;

      if (relatedEntity) {
        const relatedPerson = xpath.select1(
          "*[name()='relatedPerson']",
          relatedEntity
        ) as Document;

        const name = getHumanName(
          xpath.select("*[name()='name']", relatedPerson) as Document[]
        );

        const contactDetails = getContactDetails(
          xpath.select("*[name()='addr']", relatedEntity) as Document[],
          xpath.select("*[name()='telecom']", relatedEntity) as Document[]
        );

        const relationship = String(
          xpath.select1("string(*[name()='code']/@displayName)", relatedEntity)
        ).toLowerCase();

        return { name, contactDetails, relationship };
      }

      return undefined;
    })
    .filter(isExtendedGeneralInfoExist);
};

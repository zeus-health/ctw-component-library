import xpath from "xpath";
import { getContactDetails, getHumanName, getPeriod } from "../../helpers";
import { ExtendedGeneralInfo, isExtendedGeneralInfoExist } from "../../types";
import { isEmpty } from "@/utils/nodash";

export const getParticipantData = (document: Document): ExtendedGeneralInfo[] | undefined => {
  const participants = xpath.select(
    "*[name()='ClinicalDocument']/*[name()='participant']",
    document
  ) as Document[];

  if (isEmpty(participants)) return undefined;

  return participants
    .map((participant): ExtendedGeneralInfo | undefined => {
      const associatedEntity = xpath.select1("*[name()='associatedEntity']", participant) as
        | Document
        | undefined;

      if (associatedEntity) {
        const associatedPerson = xpath.select1(
          "*[name()='associatedPerson']",
          associatedEntity
        ) as Document;

        const name = getHumanName(xpath.select("*[name()='name']", associatedPerson) as Document[]);

        const contactDetails = getContactDetails(
          xpath.select("*[name()='addr']", associatedEntity) as Document[],
          xpath.select("*[name()='telecom']", associatedEntity) as Document[]
        );

        const time = xpath.select1("*[name()='time']", participant) as Document;

        const period = getPeriod(time);

        const relationship = String(
          xpath.select1("string(*[name()='code']/@displayName)", associatedEntity)
        ).toLowerCase();

        return {
          name,
          contactDetails,
          time: `from ${period.start} to ${period.end}`,
          relationship,
        };
      }

      return undefined;
    })
    .filter(isExtendedGeneralInfoExist);
};

import xpath from "xpath";
import { getContactDetails } from "../../helpers";
import {
  ExtendedGeneralInfo,
  isGeneralInfoExist,
  LabelValueType,
} from "../../types";
import { getDocumentationOf as getDocumentationOfDataFromHeader } from "../Header/data/getDocumentationOf";
import { get, isEmpty } from "@/utils/nodash";

export const getDocumentationOfData = (
  document: Document
):
  | { dateTime: string; finalPerformers: ExtendedGeneralInfo[] }[]
  | undefined => {
  const serviceEventXmls = xpath.select(
    "//*[name()='documentationOf']/*[name()='serviceEvent']",
    document
  ) as Document[];

  if (isEmpty(serviceEventXmls)) return undefined;

  const documentationOfs = getDocumentationOfDataFromHeader(document) as Record<
    string,
    LabelValueType[]
  >; // we can cast, it won't be undefined

  return serviceEventXmls.map(
    (
      serviceEventXml,
      index
    ): { dateTime: string; finalPerformers: ExtendedGeneralInfo[] } => {
      const performerXmls = xpath.select(
        "*[name()='performer']",
        serviceEventXml
      ) as Document[];

      const finalPerformers = performerXmls.map(
        (performerXml, index2): ExtendedGeneralInfo | undefined => {
          const functionCode = String(
            xpath.select1(
              "string(*[name()='functionCode']/@displayName)",
              performerXml
            )
          );
          const name = get(
            documentationOfs,
            `documentationOf${index + 1}[${index2 + 1}].value`
          ) as unknown as string; // rest elements are performers

          const contactDetails = getContactDetails(
            xpath.select(
              "*[name()='assignedEntity']/*[name()='addr']",
              performerXml
            ) as Document[],
            xpath.select(
              "*[name()='assignedEntity']/*[name()='telecom']",
              performerXml
            ) as Document[]
          );

          if (!name && !functionCode && !contactDetails) return undefined;

          return {
            functionCode,
            name,
            contactDetails,
          };
        }
      );

      return {
        dateTime: get(
          documentationOfs,
          `documentationOf${index + 1}[0].value`
        ) as unknown as string, // first element is date time
        finalPerformers: finalPerformers.filter(isGeneralInfoExist),
      };
    }
  );
};

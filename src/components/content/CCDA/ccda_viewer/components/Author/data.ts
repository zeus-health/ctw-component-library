import { isEmpty } from "lodash";
import xpath from "xpath";
import { getContactDetails } from "../../helpers";
import { GeneralInfoWithOrg, LabelValueType } from "../../types";
import { getAuthor as getAuthorDataFromHeader } from "../Header/data/getAuthor";

export const getAuthorData = (
  document: Document
): GeneralInfoWithOrg[] | undefined => {
  const authorXmls = xpath.select(
    "*[name()='ClinicalDocument']/*[name()='author']",
    document
  ) as Document[];

  if (isEmpty(authorXmls)) return undefined;

  const authors = getAuthorDataFromHeader(document) as Record<
    string,
    LabelValueType[]
  >; // we can cast because we are sure that authors exist

  return authorXmls.map((authorXml, index) => {
    const assignedAuthor = xpath.select1(
      "*[name()='assignedAuthor']",
      authorXml
    ) as Document;

    const authorContactDetails = getContactDetails(
      xpath.select("*[name()='addr']", assignedAuthor) as Document[],
      xpath.select("*[name()='telecom']", assignedAuthor) as Document[]
    );

    const representedOrganization = xpath.select1(
      "*[name()='representedOrganization']",
      assignedAuthor
    ) as Document;

    const result: GeneralInfoWithOrg = {
      name: authors[`author${index + 1}`][0].value,
      contactDetails: authorContactDetails,
      organization: {
        name: authors[`author${index + 1}`][1].value,
        contactDetails: "",
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (representedOrganization) {
      const organizationContactDetails = getContactDetails(
        xpath.select("*[name()='addr']", representedOrganization) as Document[],
        xpath.select(
          "*[name()='telecom']",
          representedOrganization
        ) as Document[]
      );

      return {
        ...result,
        organization: {
          ...result.organization,
          contactDetails: organizationContactDetails,
        },
      };
    }

    return result;
  });
};

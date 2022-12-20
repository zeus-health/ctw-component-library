import { isEmpty } from "lodash";
import xpath from "xpath";
import { getContactDetails } from "../../../helpers";
import { GeneralInfo, LabelValueType } from "../../../types";
import { getGuardian as getGuardianFromHeader } from "../../Header/data/getGuardian";

export const getGuardian = (
  patientRole: Document
): GeneralInfo[] | undefined => {
  const guardians = xpath.select(
    "//*[name()='patientRole']/*[name()='patient']/*[name()='guardian']",
    document
  ) as Document[] | undefined;

  if (!guardians || isEmpty(guardians)) return undefined;

  const guardianNames = getGuardianFromHeader(patientRole) as LabelValueType[];

  return guardians.map((guardian, index) => {
    const contactDetails = getContactDetails(
      xpath.select("*[name()='addr']", guardian) as Document[],
      xpath.select("*[name()='telecom']", guardian) as Document[]
    );

    return { name: guardianNames[index].value, contactDetails };
  });
};

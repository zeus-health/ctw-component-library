import xpath from "xpath";
import { displayForName, getContactDetails, getId } from "../../../helpers";
import { GeneralInfo } from "../../../types";

export const getProviderOrganization = (patientRole: Document): GeneralInfo => {
  const providerOrganization = xpath.select1("*[name()='providerOrganization']", patientRole) as
    | Document
    | undefined;

  const custodian = xpath.select1(
    "//*[name()='custodian']/*[name()='assignedCustodian']/*[name()='representedCustodianOrganization']",
    patientRole
  ) as Document | undefined;

  const finalProvider = providerOrganization || custodian;

  const ids = (xpath.select("*[name()='id']", finalProvider) as Document[]).map(getId).join(", ");

  const names = displayForName(xpath.select("string(*[name()='name'])", finalProvider) as string[]);

  const contactDetails = getContactDetails(
    xpath.select("*[name()='addr']", finalProvider) as Document[],
    xpath.select("*[name()='telecom']", finalProvider) as Document[]
  );

  const withNames = names ? `\n${names}` : "";
  return {
    name: `${ids}${withNames}`,
    contactDetails,
  };
};

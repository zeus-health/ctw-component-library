import { camelCase, isEmpty } from "lodash";
import xpath from "xpath";
import { getPatient as getPatientDataFromHeader } from "../../Header/data/getPatient";
import { getContactDetails } from "../../../helpers";
import { getBirthPlace } from "./getBirthPlace";
import { getEthnicity } from "./getEthnicity";
import { getGuardian } from "./getGuardian";
import { getLanguage } from "./getLanguage";
import { getMaritalStatus } from "./getMaritalStatus";
import { getProviderOrganization } from "./getProviderOrganization";
import { getRace } from "./getRace";
import { getReligion } from "./getReligion";

export const getPatientData = (document: Document) => {
  const patientRoles = xpath.select(
    "//*[name()='patientRole']",
    document
  ) as Document[];

  if (!patientRoles || isEmpty(patientRoles)) return undefined;

  const dataFromHeader = getPatientDataFromHeader(document);

  const patients: any = Object.entries(dataFromHeader).reduce(
    (result, [key, value]) => ({
      ...result,
      [key]: value?.reduce(
        (valueAsObject: any, data: { label: string; value: string }) => ({
          ...valueAsObject,
          [camelCase(data.label)]: data.value,
        }),
        {}
      ),
    }),
    {}
  );

  return patientRoles.map((patientRole, index) => {
    const patient = xpath.select1(
      "*[name()='patient']",
      patientRole
    ) as Document;

    const race = getRace(patient);
    const ethnicity = getEthnicity(patient);

    const contactDetails = getContactDetails(
      xpath.select("*[name()='addr']", patientRole) as Document[],
      xpath.select("*[name()='telecom']", patientRole) as Document[]
    );

    const language = getLanguage(patient);

    const providerOrganization = getProviderOrganization(patientRole);

    const guardian = getGuardian(patientRole);

    const maritalStatus = getMaritalStatus(patient);
    const religion = getReligion(patient);
    const birthPlace = getBirthPlace(patient);

    return {
      name: patients[`patient${index + 1}`].name,
      contactDetails,
      dateOfBirth: patients[`patient${index + 1}`].dateOfBirth,
      gender: patients[`patient${index + 1}`].gender,
      race,
      ethnicity,
      patientId: patients[`patient${index + 1}`].id,
      language,
      maritalStatus,
      religion,
      birthPlace,
      guardian: guardian || [],
      providerOrganization: providerOrganization.name,
      providerOrganizationContactDetails: providerOrganization.contactDetails,
    };
  });
};

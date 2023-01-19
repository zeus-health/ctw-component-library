import xpath from "xpath";
import { getContactDetails } from "../../../helpers";
import { getPatient as getPatientDataFromHeader } from "../../Header/data/getPatient";
import { getBirthPlace } from "./getBirthPlace";
import { getEthnicity } from "./getEthnicity";
import { getGuardian } from "./getGuardian";
import { getLanguage } from "./getLanguage";
import { getMaritalStatus } from "./getMaritalStatus";
import { getProviderOrganization } from "./getProviderOrganization";
import { getRace } from "./getRace";
import { getReligion } from "./getReligion";
import { camelCase, isEmpty } from "@/utils/nodash";

export const getPatientData = (document: Document) => {
  const patientRoles = xpath.select("//*[name()='patientRole']", document) as
    | Document[]
    | undefined;

  if (!patientRoles || isEmpty(patientRoles)) return undefined;

  const dataFromHeader = getPatientDataFromHeader(document);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const patients: any = Object.entries(dataFromHeader).reduce(
    (result, [key, value]) => ({
      ...result,
      [key]: value?.reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

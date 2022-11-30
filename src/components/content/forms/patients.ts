import { CTWRequestContext } from "@/components/core/ctw-context";
import { createOrEditFhirResource } from "@/fhir/action-helper";
import { dateToISO } from "@/fhir/formatters";
import { PatientModel } from "@/fhir/models";
import { QUERY_KEY_PATIENT } from "@/utils/query-keys";
import { queryClient } from "@/utils/request";
import { cloneDeep } from "lodash";

export const editPatient = async (
  patient: PatientModel,
  formValidation: { success: boolean; data: any; errors: undefined },
  getRequestContext: () => Promise<CTWRequestContext>
) => {
  const result = cloneDeep(formValidation);

  const requestContext = await getRequestContext();

  const fhirPatient: fhir4.Patient = {
    resourceType: "Patient",
    id: patient.id,
    active: patient.active,
    name: [{ family: result.data.lastName, given: [result.data.firstName] }],
    gender: result.data.gender,
    birthDate: dateToISO(result.data.dateOfBirth),
    telecom: [
      {
        system: "email",
        value: result.data.email,
      },
      {
        system: "phone",
        value: result.data.phone,
      },
    ],
    address: [
      {
        line: [result.data.address],
        city: result.data.city,
        state: result.data.state,
        postalCode: result.data.zipCode,
      },
    ],
    contact: patient.contact,
    ...(patient.organization?.id && {
      managingOrganization: {
        reference: `Organization/${patient.organization.id}`,
      },
    }),
  };

  const response = await createOrEditFhirResource(fhirPatient, requestContext);

  await queryClient.invalidateQueries([QUERY_KEY_PATIENT]);

  return response;
};

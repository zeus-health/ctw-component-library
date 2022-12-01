import { cloneDeep } from "lodash";
import { ActionReturn } from "./types";
import { CTWRequestContext } from "@/components/core/ctw-context";
import { createOrEditFhirResource } from "@/fhir/action-helper";
import { dateToISO } from "@/fhir/formatters";
import { PatientModel } from "@/fhir/models";
import { QUERY_KEY_PATIENT } from "@/utils/query-keys";
import { queryClient } from "@/utils/request";

export type EditPatientFormData = {
  lastName: string;
  firstName: string;
  gender: fhir4.Patient["gender"];
  dateOfBirth: Date;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

type OmitMatch<T extends { data: unknown }> = Omit<T, "data"> &
  EditPatientFormData;

export const editPatient = async (
  patient: PatientModel,
  formValidation: {
    success: boolean;
    data: OmitMatch<ActionReturn<unknown>>;
    errors: undefined;
  },
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

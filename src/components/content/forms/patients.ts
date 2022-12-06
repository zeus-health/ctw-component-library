import { CTWRequestContext } from "@/components/core/ctw-context";
import { createOrEditFhirResource } from "@/fhir/action-helper";
import { dateToISO } from "@/fhir/formatters";
import { PatientModel } from "@/fhir/models";
import { QUERY_KEY_PATIENT } from "@/utils/query-keys";
import { queryClient } from "@/utils/request";

export type PatientFormData = {
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

export const editPatient = async (
  patient: PatientModel,
  data: PatientFormData,
  getRequestContext: () => Promise<CTWRequestContext>
) => {
  const requestContext = await getRequestContext();

  const fhirPatient: fhir4.Patient = {
    resourceType: "Patient",
    id: patient.id,
    active: patient.active,
    name: [
      {
        family: data.lastName,
        given: [data.firstName],
        use: patient.use ?? "official",
      },
    ],
    gender: data.gender,
    birthDate: dateToISO(data.dateOfBirth),
    telecom: [
      {
        system: "email",
        value: data.email,
      },
      {
        system: "phone",
        value: data.phone,
      },
    ],
    address: [
      {
        line: [data.address],
        city: data.city,
        state: data.state,
        postalCode: data.zipCode,
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

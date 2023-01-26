import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { createOrEditFhirResource } from "@/fhir/action-helper";
import { dateToISO } from "@/fhir/formatters";
import { PatientModel } from "@/fhir/models";
import { cloneDeep } from "@/utils/nodash";
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
  const fhirPatient = cloneDeep(patient.resource);

  fhirPatient.gender = data.gender;
  fhirPatient.birthDate = dateToISO(data.dateOfBirth);

  fhirPatient.name = [
    {
      use: "official",
      family: data.lastName,
      given: [data.firstName],
    },
  ];

  fhirPatient.address = [
    {
      line: [data.address],
      city: data.city,
      state: data.state,
      postalCode: data.zipCode,
    },
  ];

  const telecom: fhir4.ContactPoint[] = [];

  if (data.phone) {
    telecom.push({ system: "phone", value: data.phone });
  }

  if (data.email) {
    telecom.push({ system: "email", value: data.email });
  }

  fhirPatient.telecom = telecom;

  const response = await createOrEditFhirResource(fhirPatient, requestContext);

  await queryClient.invalidateQueries([QUERY_KEY_PATIENT]);

  return response;
};

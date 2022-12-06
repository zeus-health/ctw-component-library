import { OpPatch } from "fhir-kit-client/types/externals";
import { cloneDeep } from "lodash";
import { d } from "msw/lib/SetupApi-75fbec12";
import { ActionReturn } from "./types";
import { CTWRequestContext } from "@/components/core/ctw-context";
import {
  createOrEditFhirResource,
  patchFhirResource,
} from "@/fhir/action-helper";
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

  const fhirPatientReplace: OpPatch[] = [
    {
      op: "replace",
      path: "/address/0/postalCode",
      value: data.zipCode,
    },
    {
      op: "replace",
      path: "/address/0/state",
      value: data.state,
    },
    {
      op: "replace",
      path: "/address/0/city",
      value: data.city,
    },
    {
      op: "replace",
      path: "/address/0/line/0",
      value: data.address,
    },
    {
      op: "replace",
      path: "/birthDate",
      value: dateToISO(data.dateOfBirth),
    },
    {
      op: "replace",
      path: "/gender",
      value: data.gender,
    },
    {
      op: "replace",
      path: "/telecom/1/value",
      value: data.phone,
    },
    {
      op: "replace",
      path: "/telecom/0/value",
      value: data.email,
    },
    {
      op: "replace",
      path: "/name/0/given/0",
      value: data.firstName,
    },
    {
      op: "replace",
      path: "/name/0/family",
      value: data.lastName,
    },
  ];

  // const fhirPatient: fhir4.Patient = {
  //   resourceType: "Patient",
  //   id: patient.id,
  //   name: [{ use: "official", family: data.lastName, given: [data.firstName] }],
  //   gender: data.gender,
  //   birthDate: dateToISO(data.dateOfBirth),
  //   telecom: [
  //     {
  //       system: "email",
  //       value: data.email,
  //     },
  //     {
  //       system: "phone",
  //       value: data.phone,
  //     },
  //   ],
  //   address: [
  //     {
  //       line: [data.address],
  //       city: data.city,
  //       state: data.state,
  //       postalCode: data.zipCode,
  //     },
  //   ],
  //   contact: patient.contact,
  //   ...(patient.organization?.id && {
  //     managingOrganization: {
  //       reference: `Organization/${patient.organization.id}`,
  //     },
  //   }),
  // };

  const response = await patchFhirResource(
    "Patient",
    patient.id,
    fhirPatientReplace,
    requestContext
  );

  await queryClient.invalidateQueries([QUERY_KEY_PATIENT]);

  return response;
};

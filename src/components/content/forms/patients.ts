import {
  PatientHistoryResponseError,
  schedulePatientHistory,
} from "@/api/patient-history";
import { CTWRequestContext } from "@/components/core/ctw-context";
import { createOrEditFhirResource } from "@/fhir/action-helper";
import { dateToISO } from "@/fhir/formatters";
import { PatientModel } from "@/fhir/models";
import { getFormStatusErrors } from "@/utils/errors";
import { AnyZodSchema, getFormData } from "@/utils/form-helper";
import { QUERY_KEY_PATIENT } from "@/utils/query-keys";
import { queryClient } from "@/utils/request";

export const editPatient = async (
  patient: PatientModel,
  data: FormData,
  patientID: string,
  getRequestContext: () => Promise<CTWRequestContext>,
  schema: AnyZodSchema
) => {
  const result = await getFormData(data, schema);
  let requestErrors: string[] = [];

  if (!result.success) {
    return { formResult: result, requestErrors: undefined };
  }

  const requestContext = await getRequestContext();

  const fhirPatient: fhir4.Patient = {
    resourceType: "Patient",
    id: patientID,
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
    managingOrganization: {
      reference: `Organization/${patient.organization?.id}`,
    },
  };

  const response = await createOrEditFhirResource(fhirPatient, requestContext);
  const statusErrors = getFormStatusErrors(requestErrors, result, response);
  requestErrors = statusErrors.errors;
  result.success = statusErrors.resultIsSuccess;

  await queryClient.invalidateQueries([QUERY_KEY_PATIENT]);

  return { formResult: result, requestErrors };
};

export const editPatientAndScheduleHistory = async (
  patient: PatientModel,
  data: FormData,
  patientID: string,
  getRequestContext: () => Promise<CTWRequestContext>,
  schema: AnyZodSchema
) => {
  const editPatientResponse = await editPatient(
    patient,
    data,
    patientID,
    getRequestContext,
    schema
  );

  const result = editPatientResponse.formResult;
  let { requestErrors } = editPatientResponse;

  const requestContext = await getRequestContext();

  if (result.success) {
    const patientHistoryResponse = await schedulePatientHistory(
      requestContext,
      patientID,
      result.data
    );
    if ("errors" in patientHistoryResponse) {
      requestErrors = [
        patientHistoryResponse.errors.map(
          (err: PatientHistoryResponseError) => err.details
        ),
      ];
      result.success = false;
    }
  }

  return { formResult: result, requestErrors };
};

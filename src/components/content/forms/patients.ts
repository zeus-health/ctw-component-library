import {
  PatientHistoryResponseError,
  schedulePatientHistory,
} from "@/api/patient-history";
import { CTWRequestContext } from "@/components/core/ctw-context";
import { createOrEditFhirResource } from "@/fhir/action-helper";
import { isFhirError } from "@/fhir/errors";
import { dateToISO } from "@/fhir/formatters";
import { OperationOutcomeModel, PatientModel } from "@/fhir/models";
import { isOperationOutcome } from "@/fhir/operation-outcome";
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
  const managingOrganization = patient.organization?.id;
  if (!managingOrganization) {
    throw Error(
      `Managing organization not found with id of ${patient.organization?.id} and is needed in order to perform patient scheduling.`
    );
  }

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
      reference: `Organization/${managingOrganization}`,
    },
  };

  const response = await createOrEditFhirResource(fhirPatient, requestContext);

  if (isFhirError(response) && isOperationOutcome(response.response.data)) {
    requestErrors = new OperationOutcomeModel(response.response.data).issues
      .filter((issue) => issue.severity !== "warning")
      .map((issue) => issue.display);
    result.success = false;
  } else if (response instanceof Error) {
    requestErrors = [response.message];
    result.success = false;
  }

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

  await queryClient.invalidateQueries([QUERY_KEY_PATIENT]);

  return { formResult: result, requestErrors };
};

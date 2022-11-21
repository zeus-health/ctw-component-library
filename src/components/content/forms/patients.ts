import { CTWRequestContext } from "@/components/core/ctw-context";
import { createOrEditFhirResource } from "@/fhir/action-helper";
import { isFhirError } from "@/fhir/errors";
import { dateToISO } from "@/fhir/formatters";
import { OperationOutcomeModel } from "@/fhir/models";
import { isOperationOutcome } from "@/fhir/operation-outcome";
import { AnyZodSchema, getFormData } from "@/utils/form-helper";
import { QUERY_KEY_PATIENT } from "@/utils/query-keys";
import { queryClient } from "@/utils/request";

export const editPatient = async (
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
  };

  const response = await createOrEditFhirResource(fhirPatient, requestContext);

  // TODO: abstract this as it is used in various places now
  if (isFhirError(response) && isOperationOutcome(response.response.data)) {
    requestErrors = new OperationOutcomeModel(response.response.data).issues
      .filter((issue) => issue.severity !== "warning")
      .map((issue) => issue.display);
    result.success = false;
  } else if (response instanceof Error) {
    requestErrors = [response.message];
    result.success = false;
  }

  // TODO: do we need to invalidate any queries? Probably patient queries
  await queryClient.invalidateQueries([QUERY_KEY_PATIENT]);

  return { formResult: result, requestErrors };
};

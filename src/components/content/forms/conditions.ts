import { CTWRequestContext } from "@/components/core/ctw-context";
import { createOrEditFhirResource } from "@/fhir/action-helper";
import { setRecorderField } from "@/fhir/conditions";
import { isFhirError } from "@/fhir/errors";
import { dateToISO } from "@/fhir/formatters";
import { isOperationOutcome } from "@/fhir/operation-outcome";
import {
  SYSTEM_CONDITION_CLINICAL,
  SYSTEM_CONDITION_VERIFICATION_STATUS,
} from "@/fhir/system-urls";
import { ConditionModel } from "@/models/condition";
import { OperationOutcomeModel } from "@/models/operation-outcome";
import { claimsPractitionerId } from "@/utils/auth";
import { AnyZodSchema, getFormData } from "@/utils/form-helper";
import {
  QUERY_KEY_OTHER_PROVIDER_CONDITIONS,
  QUERY_KEY_PATIENT_CONDITIONS,
} from "@/utils/query-keys";
import { queryClient } from "@/utils/request";
import { Condition } from "fhir/r4";
import { FormErrors } from "./drawer-form";
import { ActionReturn } from "./types";

// Sets any autofill values that apply when a user adds a condition, whether creating or confirming.
export function setAddConditionDefaults(condition: Condition): void {
  const addDefaults: Partial<Condition> = {
    clinicalStatus: {
      coding: [
        {
          system: SYSTEM_CONDITION_CLINICAL,
          code: "active",
          display: "Active",
        },
      ],
      text: "active",
    },
    verificationStatus: {
      coding: [
        {
          system: SYSTEM_CONDITION_VERIFICATION_STATUS,
          code: "confirmed",
          display: "Confirmed",
        },
      ],
      text: "confirmed",
    },
  };

  Object.assign(condition, addDefaults);
}

export const createOrEditCondition = async (
  condition: ConditionModel | undefined,
  data: FormData,
  patientID: string,
  getRequestContext: () => Promise<CTWRequestContext>,
  schema: AnyZodSchema
): Promise<{
  formResult: ActionReturn<FormErrors>;
  requestErrors: string[] | undefined;
}> => {
  const result = await getFormData(data, schema);
  let requestErrors: string[] = [];

  if (!result.success) {
    return { formResult: result, requestErrors: undefined };
  }

  const requestContext = await getRequestContext();
  const practitionerId = claimsPractitionerId(requestContext.authToken);

  // Defines the properties of the condition based on the form.
  // The autofill values that apply to both edits and creates are here; including Practitioner, Recorder, Patient, and Recorded date.
  const fhirCondition: fhir4.Condition = {
    resourceType: "Condition",
    id: result.data.id,
    ...(practitionerId && {
      recorder: await setRecorderField(practitionerId, requestContext),
    }),
    clinicalStatus: {
      coding: [
        {
          system: SYSTEM_CONDITION_CLINICAL,
          code: result.data.clinicalStatus,
        },
      ],
    },
    verificationStatus: {
      coding: [
        {
          system: SYSTEM_CONDITION_VERIFICATION_STATUS,
          code: result.data.verificationStatus,
        },
      ],
    },
    // Keep all existing codings when editing a condition
    code:
      result.data.id && condition
        ? condition.codings
        : {
            coding: [
              {
                system: result.data.condition.system,
                code: result.data.condition.code,
                display: result.data.condition.display,
              },
            ],
            text: result.data.condition.display,
          },
    ...(result.data.abatement && {
      abatementDateTime: dateToISO(result.data.abatement),
    }),
    onsetDateTime: dateToISO(result.data.onset),
    recordedDate: dateToISO(new Date()),
    subject: { type: "Patient", reference: `Patient/${patientID}` },
    note: result.data.note ? [{ text: result.data.note }] : undefined,
  };

  if (result.data.verificationStatus === "entered-in-error") {
    fhirCondition.clinicalStatus = undefined;
  }

  const response = await createOrEditFhirResource(
    fhirCondition,
    requestContext
  );

  if (isFhirError(response) && isOperationOutcome(response.response.data)) {
    requestErrors = new OperationOutcomeModel(response.response.data).issues
      .filter((issue) => issue.severity !== "warning")
      .map((issue) => issue.display);
    result.success = false;
  } else if (response instanceof Error) {
    requestErrors = [response.message];
    result.success = false;
  }
  await Promise.all([
    queryClient.invalidateQueries([QUERY_KEY_PATIENT_CONDITIONS]),
    queryClient.invalidateQueries([QUERY_KEY_OTHER_PROVIDER_CONDITIONS]),
  ]);

  return { formResult: result, requestErrors };
};

import { Condition } from "fhir/r4";
import { cloneDeep } from "lodash";
import { CTWRequestContext } from "@/components/core/ctw-context";
import { createOrEditFhirResource } from "@/fhir/action-helper";
import { setRecorderField } from "@/fhir/conditions";
import { dateToISO } from "@/fhir/formatters";
import { ConditionModel } from "@/fhir/models/condition";
import {
  SYSTEM_CONDITION_CLINICAL,
  SYSTEM_CONDITION_VERIFICATION_STATUS,
} from "@/fhir/system-urls";
import { claimsPractitionerId } from "@/utils/auth";
import {
  QUERY_KEY_OTHER_PROVIDER_CONDITIONS,
  QUERY_KEY_PATIENT_CONDITIONS,
} from "@/utils/query-keys";
import { queryClient } from "@/utils/request";

// Sets any autofill values that apply when a user adds a condition, whether creating or confirming.
export function getAddConditionWithDefaults(condition: Condition): Condition {
  const newCondition = cloneDeep(condition);

  newCondition.clinicalStatus = {
    coding: [
      {
        system: SYSTEM_CONDITION_CLINICAL,
        code: "active",
        display: "Active",
      },
    ],
    text: "active",
  };

  newCondition.verificationStatus = {
    coding: [
      {
        system: SYSTEM_CONDITION_VERIFICATION_STATUS,
        code: "confirmed",
        display: "Confirmed",
      },
    ],
    text: "confirmed",
  };

  return newCondition;
}

export const createOrEditCondition = async (
  condition: ConditionModel | undefined,
  patientID: string,
  formValidation: { success: boolean; data: any; errors: undefined },
  getRequestContext: () => Promise<CTWRequestContext>
): Promise<unknown> => {
  const result = cloneDeep(formValidation);

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

  await Promise.all([
    queryClient.invalidateQueries([QUERY_KEY_PATIENT_CONDITIONS]),
    queryClient.invalidateQueries([QUERY_KEY_OTHER_PROVIDER_CONDITIONS]),
  ]);

  return response;
};

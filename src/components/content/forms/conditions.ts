import { CTWRequestContext } from "@/components/core/ctw-context";
import { createOrEditFhirResource } from "@/fhir/action-helper";
import { isFhirError } from "@/fhir/errors";
import { dateToISO } from "@/fhir/formatters";
import { getPractitioner } from "@/fhir/practitioner";
import {
  SYSTEM_CONDITION_CLINICAL,
  SYSTEM_CONDITION_VERIFICATION_STATUS,
} from "@/fhir/system-urls";
import { claimsPractitionerId } from "@/utils/auth";
import { getFormData } from "@/utils/form-helper";
import {
  QUERY_KEY_OTHER_PROVIDER_CONDITIONS,
  QUERY_KEY_PATIENT_CONDITIONS,
} from "@/utils/query-keys";
import { queryClient } from "@/utils/request";
import { Condition } from "fhir/r4";

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

const setRecorderField = async (
  practitionerId: string,
  requestContext: CTWRequestContext
) => {
  const practitioner = await getPractitioner(practitionerId, requestContext);
  const display = practitioner.fullName;

  return {
    reference: `Practitioner/${practitionerId}`,
    type: "Practitioner",
    display,
  };
};

export const createOrEditCondition = async (
  data: FormData,
  patientID: string,
  getRequestContext: () => Promise<CTWRequestContext>,
  schema: Zod.AnyZodObject
) => {
  const result = await getFormData(data, schema);

  if (!result.success) {
    return result;
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
      result.data.id && result.data.condition.coding
        ? result.data.condition
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
    onsetDateTime: dateToISO(result.data.onset ?? new Date()),
    recordedDate: dateToISO(new Date()),
    subject: { type: "Patient", reference: `Patient/${patientID}` },
    note: result.data.note ? [{ text: result.data.note }] : undefined,
  };

  const response = await createOrEditFhirResource(
    fhirCondition,
    requestContext.fhirClient
  );

  if (isFhirError(response)) {
    result.success = false;
  }

  queryClient.invalidateQueries([QUERY_KEY_PATIENT_CONDITIONS]);
  queryClient.invalidateQueries([QUERY_KEY_OTHER_PROVIDER_CONDITIONS]);

  return result;
};

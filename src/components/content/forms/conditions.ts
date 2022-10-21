import { CTWRequestContext } from "@/components/core/ctw-context";
import { dateToISO } from "@/fhir/formatters";
import { getPractitioner } from "@/fhir/practitioner";
import {
  SYSTEM_CONDITION_CLINICAL,
  SYSTEM_CONDITION_VERIFICATION_STATUS,
} from "@/fhir/system-urls";
import { ConditionModel } from "@/models/conditions";
import { claimsPractitionerId } from "@/utils/auth";
import { getFormData } from "@/utils/form-helper";
import {
  QUERY_KEY_OTHER_PROVIDER_CONDITIONS,
  QUERY_KEY_PATIENT_CONDITIONS,
} from "@/utils/query-keys";
import { queryClient } from "@/utils/request";

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

  // Some fields will need to be set as they are required.
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
    code: result.data.id
      ? result.data.coding
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

  const conditionModel = new ConditionModel(fhirCondition);

  // const response = await createOrEditFhirResource({
  //   resourceModel: conditionModel,
  //   fhirClient: requestContext.fhirClient,
  // });

  // if (isFhirError(response)) {
  //   result.success = false;
  // }

  queryClient.invalidateQueries([QUERY_KEY_PATIENT_CONDITIONS]);
  queryClient.invalidateQueries([QUERY_KEY_OTHER_PROVIDER_CONDITIONS]);

  return result;
};

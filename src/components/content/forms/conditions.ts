import { CTWRequestContext } from "@/components/core/ctw-context";
import { createOrEditFhirResource } from "@/fhir/action-helper";
import { isFhirError } from "@/fhir/errors";
import { dateToISO } from "@/fhir/formatters";
import { getPractitioner } from "@/fhir/practitioner";
import {
  SYSTEM_CONDITION_CLINICAL,
  SYSTEM_CONDITION_VERIFICATION_STATUS,
  SYSTEM_SNOMED,
} from "@/fhir/system-urls";
import { ConditionModel } from "@/models/conditions";
import { claimsPractitionerId } from "@/utils/auth";
import { getFormData } from "@/utils/form-helper";
import { queryClient } from "@/utils/request";
import { z } from "zod";

export const conditionSchema = z.object({
  id: z.string().optional(),
  subjectID: z.string({
    required_error: "Condition subjectID must be specified.",
  }),
  display: z.string({ required_error: "Condition name must be specified." }),
  snomedCode: z.string({ required_error: "Snomed code must be provided." }),
  clinicalStatus: z.enum([
    "active",
    "recurrence",
    "relapse",
    "inactive",
    "remission",
    "resolved",
  ]),
  onset: z
    .date({ required_error: "Condition's onset is required." })
    .max(new Date(), { message: "Onset cannot be a future date." }),
  abatement: z
    .date()
    .max(new Date(), { message: "Abatement cannot be a future date." })
    .optional(),
  verificationStatus: z.enum([
    "unconfirmed",
    "provisional",
    "differential",
    "confirmed",
    "refuted",
    "entered-in-error",
  ]),
  note: z.string().optional(),
});

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
  getRequestContext: () => Promise<CTWRequestContext>
) => {
  const result = await getFormData(data, conditionSchema);
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
    code: {
      coding: [
        {
          system: SYSTEM_SNOMED,
          code: result.data.snomedCode,
          display: result.data.display,
        },
      ],
      text: result.data.display,
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

  const response = await createOrEditFhirResource({
    resourceModel: conditionModel,
    fhirClient: requestContext.fhirClient,
  });

  if (isFhirError(response)) {
    result.success = false;
  }

  queryClient.invalidateQueries(["conditions"]);

  return result;
};

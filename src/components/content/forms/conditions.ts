import { createOrEditFhirResource } from "@/fhir/action-helper";
import { isFhirError } from "@/fhir/errors";
import { dateToISO } from "@/fhir/formatters";
import {
  SYSTEM_CONDITION_CLINICAL,
  SYSTEM_CONDITION_VERIFICATION_STATUS,
  SYSTEM_SNOMED,
} from "@/fhir/system-urls";
import { ConditionModel } from "@/models/conditions";
import { getFormData } from "@/utils/form-helper";
import { queryClient } from "@/utils/request";
import Client from "fhir-kit-client";
import { z } from "zod";

export const conditionSchema = z.object({
  id: z.string().optional(),
  subjectID: z.string({
    required_error: "Condition subjectID must be specified.",
  }),
  recordedDate: z.date({
    required_error: "Condition recorded date must be specified.",
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
  onset: z.date({ required_error: "Conditions's onset is required." }),
  abatement: z.date().optional(),
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

export const createOrEditCondition = async (
  data: FormData,
  patientID: string,
  getCTWFhirClient: () => Promise<Client>
) => {
  const result = await getFormData(data, conditionSchema);
  if (!result.success) {
    return result;
  }

  // Some fields will need to be set as they are required.
  const fhirCondition: fhir4.Condition = {
    resourceType: "Condition",
    id: result.data.id,
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
    recordedDate: dateToISO(result.data.recordedDate),
    subject: { type: "Patient", reference: `Patient/${patientID}` },
    note: result.data.note ? [{ text: result.data.note }] : undefined,
  };

  const conditionModel = new ConditionModel(fhirCondition);

  const response = await createOrEditFhirResource({
    resourceModel: conditionModel,
    getCTWFhirClient,
  });

  if (isFhirError(response)) {
    result.success = false;
  }

  queryClient.invalidateQueries(["conditions"]);

  return result;
};

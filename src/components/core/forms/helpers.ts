import { FormEntry } from "@/components/core/forms/drawer-form-with-fields";
import { dateToISO } from "@/fhir/formatters";
import {
  SYSTEM_CONDITION_CLINICAL,
  SYSTEM_CONDITION_VERIFICATION_STATUS,
  SYSTEM_SNOMED,
} from "@/fhir/system-urls";
import { ConditionModel } from "@/models/conditions";
import Client from "fhir-kit-client";
import { z } from "zod";
import { getFormData } from "../../../utils/form-helper";

export const getConditionFormData = (
  condition?: ConditionModel
): FormEntry[] => [
  // {
  //   label: "subject",
  //   value: condition?.subject,
  //   field: "subject",
  //   readonly: true,
  // },
  {
    label: "Name",
    value: condition?.display,
    field: "display",
  },
  {
    label: "Snomed Code",
    value: condition?.abatement,
    field: "snomedCode",
  },
  {
    label: "Clinical Status",
    value: condition?.clinicalStatus,
    field: "clinicalStatus",
  },
  {
    label: "Verification Status",
    value: condition?.verificationStatus,
    field: "verificationStatus",
  },
  {
    label: "Onset",
    value: condition?.onset,
    field: "onset",
  },
  {
    label: "Abatement",
    value: condition?.abatement,
    field: "abatement",
  },
  {
    label: "Note",
    lines: 3,
    field: "note",
  },
];

export const conditionSchema = z.object({
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
  abatement: z.date({ required_error: "Condition's abatement is required." }),
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

export const createCondition = async (
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
    abatementDateTime: dateToISO(result.data.abatement),
    onsetDateTime: dateToISO(result.data.onset),
    recordedDate: dateToISO(new Date()),
    subject: { type: "Patient", reference: `Patient/${patientID}` },
    note: result.data.note ? [{ text: result.data.note }] : undefined,
  };

  const conditionModel = new ConditionModel(fhirCondition);
  await conditionModel.save(getCTWFhirClient);

  return result;
};

import { FormEntry } from "@/components/core/forms/drawer-form-with-fields";
import { dateToISO } from "@/fhir/formatters";
import { SYSTEM_RXNORM } from "@/fhir/system-urls";
import { ConditionModel } from "@/models/conditions";
import { z } from "zod";

export const getConditionFormData = (
  condition?: ConditionModel
): FormEntry[] => [
  {
    label: "Name",
    value: condition?.display,
    field: "display",
  },
  {
    label: "Snomed Code",
    value: condition?.abatement,
    field: "updatedBy",
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
  updatedBy: z.string({
    required_error: "The updating party must be identified.",
  }),
  clinicalStatus: z.string({
    required_error: "clinical status is required.",
  }),
  verificationStatus: z.string({
    required_error: "verification status is required.",
  }),
  note: z.string().optional(),
  onset: z.date({ required_error: "Conditions's onset is required." }),
  abatement: z.date({ required_error: "Condition's abatement is required." }),
});

export const createCondition = async (request: Request) => {
  const { accessToken, headers } = await requireValidUserForAction(request);
  const result = await getFormData(request, conditionSchema);
  if (!result.success) {
    // TODO: fix this
    return unprocessableEntity(result.errors);
  }
  // Some fields will need to be set as they are required.
  const fhirCondition: fhir4.Condition = {
    resourceType: "Condition",
    status: result.data.status,
    dateAsserted: dateToISO(result.data.dateAsserted),
    informationSource: {
      reference: result.data.updatedBy,
      type: result.data.updatedBy.split("/")[0],
    },
    subject: { type: "Patient", reference: `Patient/${result.data.subjectID}` },
    medicationCodeableConcept: {
      coding: [
        {
          system: SYSTEM_RXNORM,
          code: result.data.rxNorm,
          display: result.data.display,
        },
      ],
    },
    note: result.data.note ? [{ text: result.data.note }] : undefined,
  };

  const medicationStatement = new ConditionModel(fhirCondition);

  await ConditionModel.save(accessToken);

  return new Response(null, { headers });
};

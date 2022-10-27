import { ConditionModel } from "@/models/condition";
import { z } from "zod";
import { ConditionsAutoComplete } from "./conditions-autocomplete";
import type { FormEntry } from "./drawer-form-with-fields";

export const getAddConditionData = ({
  condition,
}: {
  condition: ConditionModel;
}): FormEntry[] => [
  {
    label: "Condition",
    field: "condition",
    value: condition.display,
    readonly: false,
    render: (readonly: boolean | undefined, inputProps) => (
      <ConditionsAutoComplete
        readonly={readonly}
        {...inputProps}
        defaultCoding={condition.preferredCoding ?? {}}
      />
    ),
  },
  ...sharedFields(condition),
];

export const getEditingPatientConditionData = ({
  condition,
}: {
  condition: ConditionModel;
}): FormEntry[] => [
  {
    label: "id",
    value: condition.id,
    field: "id",
    readonly: true,
    hidden: true,
  },
  {
    label: "Condition",
    field: "condition",
    value: condition.display,
    readonly: true,
    hidden: true,
    render: (readonly: boolean | undefined, inputProps) => (
      <ConditionsAutoComplete
        defaultCoding={condition.codings}
        readonly={readonly}
        {...inputProps}
      />
    ),
  },

  ...sharedFields(condition),
];

const sharedFields = (condition: ConditionModel) => [
  {
    label: "subject",
    value: condition.subjectID,
    field: "subjectID",
    readonly: true,
    hidden: true,
  },
  {
    label: "Clinical Status",
    value: levelTwoToOneMapping(condition.clinicalStatus),
    field: "clinicalStatus",
  },
  {
    label: "Verification Status",
    value: levelTwoToOneMapping(condition.verificationStatus),
    field: "verificationStatus",
  },
  {
    label: "Onset",
    value: condition.onset,
    field: "onset",
  },
  {
    label: "Abatement",
    value: condition.abatement,
    field: "abatement",
  },
  {
    label: "Note",
    lines: 3,
    field: "note",
  },
];

const sharedSchema = {
  id: z.string().optional(),
  subjectID: z.string({
    required_error: "Condition subjectID must be specified.",
  }),
  clinicalStatus: z.enum(["active", "inactive"]),
  onset: z
    .date()
    .max(new Date(), { message: "Onset cannot be a future date." })
    .optional(),
  abatement: z
    .date()
    .max(new Date(), { message: "Abatement cannot be a future date." })
    .optional(),
  verificationStatus: z.enum([
    "unconfirmed",
    "confirmed",
    "refuted",
    "entered-in-error",
  ]),
  note: z.string().optional(),
};

export const conditionEditSchema = z.object({
  ...sharedSchema,
  condition: z.unknown(),
});

export const conditionAddSchema = z.object({
  ...sharedSchema,
  condition: z.object({
    display: z.string({
      required_error: "Please choose a condition.",
    }),
    code: z.string({
      required_error: "Please choose a condition.",
    }),
    system: z.string({
      required_error: "Please choose a condition.",
    }),
  }),
});

function levelTwoToOneMapping(value: string): string {
  switch (value) {
    case "recurrence":
    case "relapse":
      return "active";
    case "remission":
    case "resolved":
      return "inactive";
    case "provisional":
    case "differential":
      return "unconfirmed";
    default:
      return value;
  }
}

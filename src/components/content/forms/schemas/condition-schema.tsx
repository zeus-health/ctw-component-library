import type { FormEntry } from "../../../core/form/drawer-form-with-fields";
import Zod, { RefinementCtx, z } from "zod";
import { ConditionsAutoComplete } from "../conditions-autocomplete";
import { ConditionModel } from "@/fhir/models/condition";

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
    value: condition.notes,
    lines: 3,
    field: "note",
  },
];

const conditionSchema = z.object({
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
  note: z.string().optional(),
});

export const conditionRefinement = (
  condition: Zod.infer<typeof conditionSchema>,
  ctx: RefinementCtx
) => {
  if (condition.abatement && condition.clinicalStatus === "active") {
    ctx.addIssue({
      code: Zod.ZodIssueCode.custom,
      message: "Clinical status must be inactive.",
      path: ["abatement"],
    });
  }
  if (
    condition.abatement &&
    condition.onset &&
    condition.abatement < condition.onset
  ) {
    ctx.addIssue({
      code: Zod.ZodIssueCode.custom,
      message: "Abatement date must be after onset date.",
      path: ["abatement"],
    });
  }
};

export const conditionEditSchema = conditionSchema
  .extend({
    verificationStatus: z.enum([
      "unconfirmed",
      "confirmed",
      "refuted",
      "entered-in-error",
    ]),
  })
  .superRefine((condition, refinementCtx) =>
    conditionRefinement(condition, refinementCtx)
  );

export const conditionAddSchema = conditionSchema
  .extend({
    condition: z.object({
      code: z.string({
        required_error: "Please choose a condition.",
      }),
      // These are technically required but we mark them
      // as optional to avoid duplicative error messages.
      // The condition autocomplete will set us up so that
      // all three of these values are set.
      display: z.string().optional(),
      system: z.string().optional(),
    }),
    verificationStatus: z.enum(["confirmed", "unconfirmed"]),
  })
  .superRefine((condition, refinementCtx) =>
    conditionRefinement(condition, refinementCtx)
  );

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

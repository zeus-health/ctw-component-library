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
    label: "Status",
    value:
      condition.displayStatus === "Unknown"
        ? "Select One"
        : condition.displayStatus,
    field: "status",
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
  status: z.enum([
    "Active",
    "Pending",
    "Inactive",
    "Refuted",
    "Entered In Error",
  ]),
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
  if (condition.abatement && condition.status !== "Inactive") {
    ctx.addIssue({
      code: Zod.ZodIssueCode.custom,
      message: "Status must be inactive.",
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

export const conditionEditSchema = conditionSchema.superRefine(
  (condition, refinementCtx) => conditionRefinement(condition, refinementCtx)
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
  })
  .superRefine((condition, refinementCtx) =>
    conditionRefinement(condition, refinementCtx)
  );

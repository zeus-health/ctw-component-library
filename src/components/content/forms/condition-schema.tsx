import { ConditionModel } from "@/models/conditions";
import { z } from "zod";
import { ConditionsAutoComplete } from "./conditions-autocomplete";
import type { FormEntry } from "./drawer-form-with-fields";

export const getAddConditionData = ({
  condition,
}: {
  condition: ConditionModel;
}): FormEntry[] => [
  {
    label: "subject",
    value: condition.subjectID,
    field: "subjectID",
    readonly: true,
    hidden: true,
  },
  {
    label: "Name",
    value: condition.display,
    field: "display",
  },
  {
    label: "Snomed Code",
    value: condition.snomedCode,
    field: "snomedCode",
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
    label: "subject",
    value: condition.subjectID,
    field: "subjectID",
    readonly: true,
    hidden: true,
  },

  ...sharedFields(condition),
];

const sharedFields = (condition: ConditionModel) => [
  {
    label: "Condition",
    value: "",
    field: "condition",
    readonly: false,
    render: (authToken: string, name: string) => (
      <ConditionsAutoComplete authToken={authToken} name={name} />
    ),
  },
  {
    label: "Clinical Status",
    value: condition.clinicalStatus,
    field: "clinicalStatus",
  },
  {
    label: "Verification Status",
    value: condition.verificationStatus,
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

export const conditionSchema = z.object({
  id: z.string().optional(),
  subjectID: z.string({
    required_error: "Condition subjectID must be specified.",
  }),
  conditionSystem: z.string({
    required_error: "Condition system must be specified.",
  }),
  conditionCode: z.string({
    required_error: "Condition code must be specified.",
  }),
  condition: z.string({
    required_error: "Condition name must be specified.",
  }),
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

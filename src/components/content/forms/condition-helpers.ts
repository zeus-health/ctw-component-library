import { ConditionModel } from "@/models/conditions";
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
  {
    label: "Name",
    value: condition.display,
    field: "display",
    readonly: true,
  },
  {
    label: "Snomed Code",
    value: condition.snomedCode,
    field: "snomedCode",
    readonly: true,
  },
  ...sharedFields(condition),
];

const sharedFields = (condition: ConditionModel) => [
  {
    label: "Condition",
    value: "",
    field: "condition",
    readonly: false,
    autocomplete: true,
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

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

export const getEditingOrAddingFromLensConditionData = ({
  condition,
  patientID,
}: {
  condition: ConditionModel;
  patientID: string;
}): FormEntry[] => {
  condition.setSubjectID(patientID);
  return [
    ...editOrAddFromLensSharedFields(condition),
    ...sharedFields(condition),
  ];
};

const editOrAddFromLensSharedFields = (condition: ConditionModel) => [
  {
    label: "subject",
    value: condition.subjectID,
    field: "subjectID",
    readonly: true,
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
];

const sharedFields = (condition: ConditionModel) => [
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
    label: "Recorded Date",
    value: condition.recordedDate,
    field: "recordedDate",
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

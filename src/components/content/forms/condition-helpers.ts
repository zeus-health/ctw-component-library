import { ConditionModel } from "@/models/conditions";
import type { FormEntry } from "./drawer-form-with-fields";

export const getAddConditionData = ({
  condition,
  patientID,
}: {
  condition: ConditionModel;
  patientID: string;
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
  ...sharedFields(condition, patientID),
];

export const getEditingPatientConditionData = ({
  condition,
  patientID,
}: {
  condition: ConditionModel;
  patientID: string;
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
  ...sharedFields(condition, patientID),
];

const sharedFields = (condition: ConditionModel, patientID: string) => [
  {
    label: "PatientID",
    value: patientID,
    field: "patientID",
    hidden: true,
    readonly: true,
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

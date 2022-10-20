import {
  SYSTEM_CONDITION_CLINICAL,
  SYSTEM_CONDITION_VERIFICATION_STATUS,
} from "@/fhir/system-urls";
import { ConditionModel } from "@/models/conditions";
import { Condition } from "fhir/r4";
import type { FormEntry } from "./drawer-form-with-fields";

export const getAddConditionFormEntries = ({
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
  ...getSharedFields(condition),
];

export const getEditConditionFormEntries = ({
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
  ...getSharedFields(condition),
];

const getSharedFields = (condition: ConditionModel) => [
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

// Sets any autofill values that apply when a user adds a medication, whether creating or confirming.
export function applyAddConditionDefaults(condition: Condition): Condition {
  const addDefaults: Partial<Condition> = {
    clinicalStatus: {
      coding: [
        {
          system: SYSTEM_CONDITION_CLINICAL,
          code: "active",
          display: "Active",
        },
      ],
      text: "active",
    },
    verificationStatus: {
      coding: [
        {
          system: SYSTEM_CONDITION_VERIFICATION_STATUS,
          code: "confirmed",
          display: "Confirmed",
        },
      ],
      text: "confirmed",
    },
  };

  return Object.assign(condition, addDefaults);
}

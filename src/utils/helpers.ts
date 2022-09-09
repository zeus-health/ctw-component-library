import { FormEntry } from "@/components/core/forms/drawer-form-with-fields";
import { ConditionModel } from "@/models/conditions";
import { z } from "zod";

export const getConditionFormData = (
  medication?: ConditionModel
): FormEntry[] => [
  {
    label: "Subject",
    value: medication?.subjectID,
    field: "subjectID",
    readonly: true,
  },
  {
    label: "Updated By",
    value: medication?.informationSource?.reference,
    field: "updatedBy",
    readonly: true,
  },
  {
    label: "Date Asserted",
    value: medication?.dateAsserted,
    field: "dateAsserted",
    readonly: true,
  },
  {
    label: "New Note",
    lines: 3,
    field: "note",
  },
  {
    label: "Medication",
    value: medication?.display,
    field: "display",
  },
  {
    label: "RxNorm",
    value: medication?.rxNorm,
    field: "rxNorm",
  },
  {
    label: "Status",
    value: medication?.status,
    field: "status",
  },
];

export const conditionSchema = z.object({
  subjectID: z.string({ required_error: "Patient must be specified." }),
  updatedBy: z.string({
    required_error: "The updating party must be identified.",
  }),
  dateAsserted: z.date({ required_error: "Date asserted is required." }),
  note: z.string().optional(),
  display: z.string({ required_error: "Medication name is required." }),
  rxNorm: z.string({ required_error: "Medication's RxNorm is required." }),
  status: z.enum([
    "active",
    "completed",
    "entered-in-error",
    "intended",
    "stopped",
    "on-hold",
    "unknown",
    "not-taken",
  ]),
});

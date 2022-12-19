import { format } from "date-fns";
import { z } from "zod";
import { MedicationsAutoComplete } from "../medications-autocomplete";
import { FormEntry } from "@/components/core/form/drawer-form-with-fields";
import { MedicationStatementModel } from "@/fhir/models";

export const getMedicationFormData = (
  medication: MedicationStatementModel
): FormEntry[] => [
  {
    label: "Subject",
    value: medication.subjectID,
    field: "subjectID",
    readonly: true,
    hidden: true,
  },
  {
    label: "Date Asserted",
    value: medication.dateAsserted ?? format(new Date(), "P"),
    field: "dateAsserted",
    readonly: true,
  },
  {
    label: "Medication",
    field: "medication",
    value: medication.display,
    readonly: false,
    render: (readonly: boolean | undefined, inputProps) => (
      <MedicationsAutoComplete
        readonly={readonly}
        {...inputProps}
        defaultCoding={medication.rxNormCoding ?? {}}
      />
    ),
  },
  {
    label: "Latest Status",
    value: medication.status,
    field: "status",
  },
  {
    label: "Instructions",
    value: medication.dosage,
    field: "dosage",
  },
];

export const medicationStatementSchema = z.object({
  subjectID: z.string({ required_error: "Patient must be specified." }),
  dateAsserted: z.date({ required_error: "Date asserted is required." }),
  medication: z.object({
    code: z.string({
      required_error: "Please choose a medication.",
    }),
    // These are technically required but we mark them
    // as optional to avoid duplicative error messages.
    // The condition autocomplete will set us up so that
    // all three of these values are set.
    display: z.string().optional(),
    system: z.string().optional(),
  }),
  dosage: z.string().optional(),
  status: z.enum([
    "active",
    "completed",
    "entered-in-error",
    "intended",
    "not-taken",
    "on-hold",
    "stopped",
    "unknown",
  ]),
});

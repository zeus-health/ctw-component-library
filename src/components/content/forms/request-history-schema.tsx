import { FormEntry } from "@/components/core/form/drawer-form-with-fields";
import { z } from "zod";

export const getRequestData = (data: unknown): FormEntry[] => [
  {
    presentational: true,
    render: (readonly: boolean | undefined, inputProps) => (
      <div readOnly={readonly} {...inputProps}>
        hello
      </div>
    ),
  },
  {
    label: "Practitioner Name",
    field: "name",
    value: "",
    readonly: false,
  },
  {
    label: "NPI",
    field: "npi",
    value: "",
    readonly: false,
  },
  {
    label: "Role",
    field: "role",
    value: "",
    readonly: false,
  },
];

export const requestHistorySchema = z.object({
  name: z.string().optional(),
  npi: z.string({
    required_error: "Condition subjectID must be specified.",
  }),
  role: z.enum(["Doctor", "Nurse", "Other"]),
});

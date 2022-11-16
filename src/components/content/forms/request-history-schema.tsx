import { FormEntry } from "@/components/core/form/drawer-form-with-fields";
import { z } from "zod";

export const getRequestData = (data: unknown): FormEntry[] => [
  {
    label: "treating-provider",
    presentational: true,
    render: () => (
      <div className="ctw-font-medium">
        Who is the treating provider for this patient?
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
  {
    label: "patient-information",
    presentational: true,
    render: () => (
      <div>
        <div className="ctw-font-medium">
          Is the patient information below correct and up-to-date?
        </div>
        <div>
          Complete as many fields as possible to increase matching results.
        </div>
      </div>
    ),
  },
  {
    label: "First Name",
    field: "firstName",
    value: "",
    readonly: false,
  },
  {
    label: "Last Name",
    field: "lastName",
    value: "",
    readonly: false,
  },
  {
    label: "Date of Birth",
    field: "dateOfBirth",
    value: "",
    readonly: false,
  },
  {
    label: "Gender",
    field: "gender",
    value: "",
    readonly: false,
  },
  {
    label: "Address",
    field: "address",
    value: "",
    readonly: false,
  },
  {
    label: "City",
    field: "city",
    value: "",
    readonly: false,
  },
  {
    label: "State",
    field: "state",
    value: "",
    readonly: false,
  },
  {
    label: "Zip",
    field: "zipCode",
    value: "",
    readonly: false,
  },
  {
    label: "Phone",
    field: "phone",
    value: "",
    readonly: false,
  },
  {
    label: "Email",
    field: "email",
    value: "",
    readonly: false,
  },
];

export const requestHistorySchema = z.object({
  name: z.string({
    required_error: "Practitioner name must be specified.",
  }),
  npi: z
    .string({
      required_error: "NPI must be specified.",
    })
    .length(10),
  role: z.enum(["Doctor", "Nurse", "Other"]),
  firstName: z.string({
    required_error: "First name must be specified.",
  }),
  lastName: z.string({
    required_error: "Last name must be specified.",
  }),
  dateOfBirth: z
    .date()
    .max(new Date(), { message: "Date of birth cannot be a future date." }),
  gender: z.enum(["-", "male", "female", "other", "unknown"]),
  address: z.string({
    required_error: "Address must be specified.",
  }),
  city: z.string({
    required_error: "City must be specified.",
  }),
  state: z.string({
    required_error: "State must be specified.",
  }),
  zipCode: z.string({
    required_error: "Zip code must be specified.",
  }),
  phone: z.string().optional(),
  email: z.string().optional(),
});

import { z } from "zod";
import {
  getStateEnum,
  phoneNumberRegex,
  stateCode,
  zipCodeRegex,
} from "./validations";
import { FormEntry } from "@/components/core/form/drawer-form-with-fields";
import { PatientModel } from "@/fhir/models";

export const getRequestData = (
  patient: PatientModel | undefined,
  includePatientDemographicsForm: boolean
): FormEntry[] => [
  {
    label: "treating-provider",
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
  [
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
  ],
  ...(!includePatientDemographicsForm
    ? []
    : [
        {
          label: "patient-information",
          render: () => (
            <div>
              <div className="ctw-font-medium">
                Is the patient information below correct and up-to-date?
              </div>
              <div>
                Complete as many fields as possible to increase matching
                results.
              </div>
            </div>
          ),
        },
        {
          label: "First Name",
          field: "firstName",
          value: patient?.firstName ?? "",
          readonly: false,
        },
        {
          label: "Last Name",
          field: "lastName",
          value: patient?.lastName ?? "",
          readonly: false,
        },
        [
          {
            label: "Date of Birth",
            field: "dateOfBirth",
            value: patient?.dob ?? "",
            readonly: false,
          },
          {
            label: "Gender",
            field: "gender",
            value: patient?.gender ?? "",
            readonly: false,
          },
        ],
        {
          label: "Address",
          field: "address",
          value: patient?.homeAddress?.line?.join(", ") ?? "",
          readonly: false,
        },
        {
          label: "City",
          field: "city",
          value: patient?.homeAddress?.city ?? "",
          readonly: false,
        },
        [
          {
            label: "State",
            field: "state",
            value: stateCode(patient?.homeAddress?.state),
            readonly: false,
          },
          {
            label: "Zip",
            field: "zipCode",
            value: patient?.homeAddress?.postalCode ?? "",
            readonly: false,
          },
        ],
        {
          label: "Phone",
          field: "phone",
          value: patient?.phoneNumber ?? "",
          readonly: false,
        },
        {
          label: "Email",
          field: "email",
          value: patient?.email ?? "",
          readonly: false,
        },
      ]),
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
});

export const savePatientAndRequestHistorySchema = requestHistorySchema.merge(
  z.object({
    firstName: z.string({
      required_error: "First name must be specified.",
    }),
    lastName: z.string({
      required_error: "Last name must be specified.",
    }),
    dateOfBirth: z
      .date()
      .min(new Date("1900"), { message: "Date of birth is invalid." })
      .max(new Date(), { message: "Date of birth cannot be a future date." }),
    gender: z.enum(["-", "male", "female", "other", "unknown"]),
    address: z.string({
      required_error: "Address must be specified.",
    }),
    city: z.string({
      required_error: "City must be specified.",
    }),
    state: getStateEnum("State must be specified."),
    zipCode: z
      .string({
        required_error: "Zip code must be specified.",
      })
      .regex(zipCodeRegex, {
        message: "Zip code is invalid.",
      }),
    phone: z
      .string()
      .regex(phoneNumberRegex, { message: "Phone number is invalid." })
      .optional(),
    email: z
      .string()
      .email({ message: "Email address is invalid." })
      .optional(),
  })
);

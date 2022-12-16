import type { FormEntry } from "../../core/form/drawer-form-with-fields";
import { z } from "zod";
import { MedicationsAutoComplete } from "./medications-autocomplete";
import { CTWRequestContext } from "@/components/core/ctw-context";
import { createFhirResourceWithProvenance } from "@/fhir/action-helper";
import { dateToISO } from "@/fhir/formatters";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import { SYSTEM_RXNORM } from "@/fhir/system-urls";
import {
  QUERY_KEY_PATIENT,
  QUERY_KEY_PATIENT_BUILDER_MEDICATIONS,
  QUERY_KEY_PATIENT_MEDICATIONS,
} from "@/utils/query-keys";
import { queryClient } from "@/utils/request";

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

const QUERY_KEYS = [
  QUERY_KEY_PATIENT,
  QUERY_KEY_PATIENT_MEDICATIONS,
  QUERY_KEY_PATIENT_BUILDER_MEDICATIONS,
];

export type CreateMedicationStatementFormData = {
  status: fhir4.MedicationStatement["status"];
  dateAsserted: Date;
  subjectID: string;
  medication: { display: string; code: string };
  dosage: string;
  note?: string;
};

export const createMedicationStatement = async (
  data: CreateMedicationStatementFormData,
  getRequestContext: () => Promise<CTWRequestContext>
): Promise<unknown> => {
  // Some fields will need to be set as they are required.
  const fhirMedicationStatement: fhir4.MedicationStatement = {
    resourceType: "MedicationStatement",
    status: data.status,
    dateAsserted: dateToISO(data.dateAsserted),
    subject: { type: "Patient", reference: `Patient/${data.subjectID}` },
    medicationCodeableConcept: {
      text: data.medication.display,
      coding: [
        {
          system: SYSTEM_RXNORM,
          code: data.medication.code,
        },
      ],
    },
    dosage: [
      {
        text: data.dosage,
      },
    ],
  };

  const resourceModel = new MedicationStatementModel(fhirMedicationStatement);

  const response = await createFhirResourceWithProvenance(
    resourceModel.resource,
    await getRequestContext()
  );

  await Promise.all(
    QUERY_KEYS.map(async (queryKey) =>
      queryClient.invalidateQueries([queryKey])
    )
  );

  return response;
};

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
    value: medication.dateAsserted,
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
        defaultCoding={{}}
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

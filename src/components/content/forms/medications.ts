import type { FormEntry } from "../../core/form/drawer-form-with-fields";
import { cloneDeep } from "lodash";
import { z } from "zod";
import { ActionReturn } from "./types";
import { CTWRequestContext } from "@/components/core/ctw-context";
import { createOrEditFhirResource } from "@/fhir/action-helper";
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
  note: z.string().optional(),
  display: z.string().optional(),
  rxNormCode: z.string({ required_error: "RxNorm Code is required." }),
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
  display: string;
  rxNormCode: string;
  dosage: string;
  note?: string;
};

export const createMedicationStatement = async (
  data: CreateMedicationStatementFormData,
  getRequestContext: () => Promise<CTWRequestContext>
): Promise<unknown> => {
  const { fhirClient } = await getRequestContext();

  // Some fields will need to be set as they are required.
  const fhirMedicationStatement: fhir4.MedicationStatement = {
    resourceType: "MedicationStatement",
    status: data.status,
    dateAsserted: dateToISO(data.dateAsserted),
    subject: { type: "Patient", reference: `Patient/${data.subjectID}` },
    medicationCodeableConcept: {
      text: data.display,
      coding: [
        {
          system: SYSTEM_RXNORM,
          code: data.rxNormCode,
        },
      ],
    },
    dosage: [
      {
        text: data.dosage,
      },
    ],
    note: data.note ? [{ text: data.note }] : undefined,
  };

  const resourceModel = new MedicationStatementModel(fhirMedicationStatement);

  const response = await createOrEditFhirResource(
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
    label: "Medication Name",
    value: medication.display,
    field: "display",
  },
  {
    label: "RxNorm Code",
    value: medication.rxNorm,
    field: "rxNormCode",
  },
  {
    label: "Latest Status",
    value: medication.status,
    field: "status",
  },
  {
    label: "Dosage",
    value: medication.dosage,
    field: "dosage",
  },
  {
    label: "New Note",
    lines: 3,
    field: "note",
  },
];

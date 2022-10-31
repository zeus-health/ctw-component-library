import { CTWRequestContext } from "@/components/core/ctw-context";
import { createOrEditFhirResource } from "@/fhir/action-helper";
import { isFhirError } from "@/fhir/errors";
import { dateToISO } from "@/fhir/formatters";
import { MedicationStatementModel } from "@/models/medication-statement";
import { getFormData } from "@/utils/form-helper";
import {
  QUERY_KEY_PATIENT,
  QUERY_KEY_PATIENT_BUILDER_MEDICATIONS,
  QUERY_KEY_PATIENT_MEDICATIONS,
} from "@/utils/query-keys";
import { queryClient } from "@/utils/request";
import { z } from "zod";
import type { FormEntry } from "./drawer-form-with-fields";

export const medicationStatementSchema = z.object({
  subjectID: z.string({ required_error: "Patient must be specified." }),
  updatedBy: z.string({
    required_error: "The updating party must be identified.",
  }),
  dateAsserted: z.date({ required_error: "Date asserted is required." }),
  note: z.string().optional(),
  display: z.string({ required_error: "Medication name is required." }),
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

// Hardcoded sentence-cased display statuses for MedicationStatements.
export const MedicationStatusLabelsMap = {
  active: "Active",
  completed: "Completed",
  "entered-in-error": "Entered in error",
  intended: "Intended",
  "not-taken": "Not taken",
  "on-hold": "On hold",
  stopped: "Stopped",
  unknown: "Unknown",
};

const QUERY_KEYS = [
  QUERY_KEY_PATIENT,
  QUERY_KEY_PATIENT_MEDICATIONS,
  QUERY_KEY_PATIENT_BUILDER_MEDICATIONS,
];

export const createMedicationStatement = async (
  data: FormData,
  patientID: string,
  getRequestContext: () => Promise<CTWRequestContext>
) => {
  const result = await getFormData(data, medicationStatementSchema);
  if (!result.success) {
    return result;
  }

  const { fhirClient } = await getRequestContext();

  // Some fields will need to be set as they are required.
  const fhirMedicationStatement: fhir4.MedicationStatement = {
    resourceType: "MedicationStatement",
    status: result.data.status,
    dateAsserted: dateToISO(result.data.dateAsserted),
    informationSource: {
      reference: result.data.updatedBy,
      type: result.data.updatedBy.split("/")[0],
    },
    subject: { type: "Patient", reference: `Patient/${result.data.subjectID}` },
    medicationCodeableConcept: {
      coding: [
        {
          display: result.data.display,
        },
      ],
    },
    note: result.data.note ? [{ text: result.data.note }] : undefined,
  };

  const resourceModel = new MedicationStatementModel(fhirMedicationStatement);

  const response = await createOrEditFhirResource(
    resourceModel.resource,
    fhirClient
  );

  if (isFhirError(response)) {
    result.success = false;
  }

  QUERY_KEYS.forEach((queryKey) => {
    queryClient.invalidateQueries([queryKey]);
  });

  return result;
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
    label: "Updated By",
    value: medication.informationSource?.reference,
    field: "updatedBy",
    readonly: true,
  },
  {
    label: "Date Asserted",
    value: medication.dateAsserted,
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
    value: medication.display,
    field: "display",
  },
  {
    label: "Status",
    value: medication.status,
    field: "status",
  },
];

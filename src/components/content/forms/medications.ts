import { z } from "zod";
import Client from "fhir-kit-client";
import { CTWRequestContext } from "@/components/core/ctw-context";
import { createOrEditFhirResource } from "@/fhir/action-helper";
import { isFhirError } from "@/fhir/errors";
import { dateToISO } from "@/fhir/formatters";
import { SYSTEM_RXNORM } from "@/fhir/system-urls";
import { MedicationStatementModel } from "@/models/medication-statement";
import { getFormData } from "@/utils/form-helper";
import { queryClient } from "@/utils/request";
import type { FormEntry } from "./drawer-form-with-fields";

export const medicationStatementSchema = z.object({
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
          system: SYSTEM_RXNORM,
          code: result.data.rxNorm,
          display: result.data.display,
        },
      ],
    },
    note: result.data.note ? [{ text: result.data.note }] : undefined,
  };

  const resourceModel = new MedicationStatementModel(fhirMedicationStatement);

  const response = await createOrEditFhirResource({
    resourceModel,
    fhirClient,
  });

  if (isFhirError(response)) {
    result.success = false;
  }

  // @todo replace these with constants
  queryClient.invalidateQueries(["medications"]);
  queryClient.invalidateQueries(["lens-medications"]);
  queryClient.invalidateQueries(["patient-medications"]);

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
    label: "RxNorm",
    value: medication.rxNorm,
    field: "rxNorm",
  },
  {
    label: "Status",
    value: medication.status,
    field: "status",
  },
];

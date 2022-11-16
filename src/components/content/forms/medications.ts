import { CTWRequestContext } from "@/components/core/ctw-context";
import { createOrEditFhirResource } from "@/fhir/action-helper";
import { isFhirError } from "@/fhir/errors";
import { dateToISO } from "@/fhir/formatters";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import { OperationOutcomeModel } from "@/fhir/models/operation-outcome";
import { isOperationOutcome } from "@/fhir/operation-outcome";
import { SYSTEM_RXNORM } from "@/fhir/system-urls";
import { getFormData } from "@/utils/form-helper";
import {
  QUERY_KEY_PATIENT,
  QUERY_KEY_PATIENT_BUILDER_MEDICATIONS,
  QUERY_KEY_PATIENT_MEDICATIONS,
} from "@/utils/query-keys";
import { queryClient } from "@/utils/request";
import { z } from "zod";
import type { FormEntry } from "../../core/form/drawer-form-with-fields";
import { ActionReturn, MedicationFormData } from "./types";

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

export const createMedicationStatement = async (
  data: FormData,
  patientId: string,
  getRequestContext: () => Promise<CTWRequestContext>
): Promise<{
  formResult: ActionReturn<MedicationFormData>;
  requestErrors: string[] | undefined;
}> => {
  const result = await getFormData(data, medicationStatementSchema);
  let requestErrors: string[] = [];

  if (!result.success) {
    return { formResult: result, requestErrors: undefined };
  }

  const { fhirClient } = await getRequestContext();

  // Some fields will need to be set as they are required.
  const fhirMedicationStatement: fhir4.MedicationStatement = {
    resourceType: "MedicationStatement",
    status: result.data.status,
    dateAsserted: dateToISO(result.data.dateAsserted),
    subject: { type: "Patient", reference: `Patient/${result.data.subjectID}` },
    medicationCodeableConcept: {
      text: result.data.display,
      coding: [
        {
          system: SYSTEM_RXNORM,
          code: result.data.rxNormCode,
        },
      ],
    },
    dosage: [
      {
        text: result.data.dosage,
      },
    ],
    note: result.data.note ? [{ text: result.data.note }] : undefined,
  };

  const resourceModel = new MedicationStatementModel(fhirMedicationStatement);

  const response = await createOrEditFhirResource(
    resourceModel.resource,
    await getRequestContext()
  );

  if (isFhirError(response) && isOperationOutcome(response.response.data)) {
    requestErrors = new OperationOutcomeModel(response.response.data).issues
      .filter((issue) => issue.severity !== "warning")
      .map((issue) => issue.display);
    result.success = false;
  } else if (response instanceof Error) {
    requestErrors = [response.message];
    result.success = false;
  }

  await Promise.all(
    QUERY_KEYS.map(async (queryKey) => {
      queryClient.invalidateQueries([queryKey]);
    })
  );

  return { formResult: result, requestErrors };
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

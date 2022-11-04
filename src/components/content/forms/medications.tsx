import { CTWRequestContext } from "@/components/core/ctw-context";
import { createOrEditFhirResource } from "@/fhir/action-helper";
import { isFhirError } from "@/fhir/errors";
import { dateToISO } from "@/fhir/formatters";
import { isOperationOutcome } from "@/fhir/operation-outcome";
import { SYSTEM_RXNORM } from "@/fhir/system-urls";
import { MedicationStatementModel } from "@/models/medication-statement";
import { OperationOutcomeModel } from "@/models/operation-outcome";
import { getFormData } from "@/utils/form-helper";
import {
  QUERY_KEY_PATIENT,
  QUERY_KEY_PATIENT_BUILDER_MEDICATIONS,
  QUERY_KEY_PATIENT_MEDICATIONS,
} from "@/utils/query-keys";
import { queryClient } from "@/utils/request";
import { z } from "zod";
import { DosageItem } from "../../../api/autocomplete-medications";
import { DosageSelect } from "./dosages-select";
import type { FormEntry } from "./drawer-form-with-fields";
import { MedicationsAutoComplete } from "./medications-autocomplete";
import { ActionReturn, MedicationFormData } from "./types";

type GetAddMedicationDataProps = {
  medication: MedicationStatementModel;
  onMedicationNameChange?: (value: string) => void;
  onMedicationDosageChange?: (value: DosageItem) => void;
};

export const getAddMedicationData = ({
  medication,
  onMedicationNameChange,
  onMedicationDosageChange,
}: GetAddMedicationDataProps): FormEntry[] => [
  {
    label: "Medication name",
    field: "display",
    value: medication.display,
    readonly: false,
    render: (readonly: boolean | undefined, inputProps) => (
      <MedicationsAutoComplete
        readonly={readonly}
        onValueChange={onMedicationNameChange}
        {...inputProps}
        defaultCoding={{}}
      />
    ),
  },
  {
    label: "Dosage",
    value: medication.dosage,
    field: "dosage",
    readonly: false,
    render: (readonly: boolean | undefined, inputProps) => (
      <DosageSelect
        medName={medication.display}
        onChange={onMedicationDosageChange}
      />
    ),
  },
  {
    label: "RxNorm Code",
    value: medication.rxNorm,
    field: "rxNormCode",
    readonly: true,
  },
  ...sharedFields(medication),
];

export const medicationStatementSchema = z.object({
  subjectID: z.string({ required_error: "Patient must be specified." }),
  dateAsserted: z.date({ required_error: "Date asserted is required." }),
  note: z.string().optional(),
  display: z.string().optional(),
  rxNormCode: z.string({ required_error: "RxNorm Code is required." }),
  dosage: z.string(),
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
    fhirClient
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

  QUERY_KEYS.forEach((queryKey) => {
    queryClient.invalidateQueries([queryKey]);
  });

  return { formResult: result, requestErrors };
};

export const sharedFields = (
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
    label: "Latest Status",
    value: medication.status,
    field: "status",
  },
  {
    label: "New Note",
    lines: 3,
    field: "note",
  },
];

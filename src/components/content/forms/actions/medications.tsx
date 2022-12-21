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
    ...(data.dosage && {
      dosage: [
        {
          text: data.dosage,
        },
      ],
    }),
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

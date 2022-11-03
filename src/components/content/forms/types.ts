export type ActionReturn<T> =
  | { success: true | false; data: T; errors: undefined }
  | { success: false; data: undefined; errors: { [key: string]: string[] } };

export type MedicationFormData = {
  note?: string | undefined;
  display?: string | undefined;
  dosage?: string | undefined;
  subjectID: string;
  dateAsserted: Date;
  rxNormCode: string;
  status: fhir4.MedicationStatement["status"];
};

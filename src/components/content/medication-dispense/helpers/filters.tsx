import { MedicationDispenseModel } from "@/fhir/models";

export const applyMedDispenseFilters = (data: fhir4.MedicationDispense[]) => {
  const medDispenseModel = data.map((m) => new MedicationDispenseModel(m));

  return medDispenseModel.filter((m) => m.PMARefillNotPickedUp === "PMARefillNotPickedUp");
};

import { MedicationDispenseModel } from "@/fhir/models";

export const applyMedDispenseFilters = (data: fhir4.MedicationDispense[]) =>
  data
    .map((m) => new MedicationDispenseModel(m))
    .filter((m) => m.PMARefillNotPickedUp === "PMARefillNotPickedUp");

import { createContext } from "react";
import { PatientFormData } from "../../content/forms/actions/patients";
import { Tag } from "@/fhir/types";

export type PatientState = {
  patientID: string;
  systemURL: string;
  tags?: Tag[];
  onPatientSave?: (data: PatientFormData) => Promise<void>;
  onResourceSave?: (data: fhir4.Resource, action: "create" | "update") => void;
};

export const PatientContext = createContext<PatientState | undefined>(undefined);

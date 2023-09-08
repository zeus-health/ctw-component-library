import { EncounterWithPatientModel } from "./patients-adt-alerts-table";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";

export function useADTAlertDetailsDrawer() {
  return useResourceDetailsDrawer({
    header: (adt) => `${adt.patient.display}(${adt.patient.gender})`,
    subHeader: (adt) => `${adt.patient.dob}(${adt.patient.age})`,
    getSourceDocument: true,
    details: encounterData,
    enableDismissAndReadActions: false, // We haven't gotten to supporting this yet
  });
}

export const encounterData = (adt: EncounterWithPatientModel) => [
  { label: "Start Date", value: adt.periodStart },
  { label: "End Date", value: adt.periodEnd },
  { label: "Type", value: adt.typeDisplay },
  { label: "Location", value: adt.location },
  { label: "Participants", value: adt.participants },
  { label: "Diagnosis", value: adt.diagnoses?.join(", ") },
  { label: "Discharge Disposition", value: adt.dischargeDisposition },
];

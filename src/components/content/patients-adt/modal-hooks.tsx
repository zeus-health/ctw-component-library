import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { EncounterModel } from "@/fhir/models/encounter";

export function useADTAlertDetailsDrawer() {
  return useResourceDetailsDrawer({
    header: (adt) =>
      `${adt.patient?.display}${
        adt.patient?.gender ? ` (${adt.patient.gender[0].toUpperCase()})` : ""
      }`,
    subHeader: (adt) => `${adt.patient?.dob} (${adt.patient?.age})`,
    getSourceDocument: true,
    details: encounterData,
    enableDismissAndReadActions: true,
    // todo: getHistory
  });
}

export const encounterData = (adt: EncounterModel) => [
  { label: "Start Date", value: adt.periodStart },
  { label: "End Date", value: adt.periodEnd },
  { label: "Type", value: adt.typeDisplay },
  { label: "Location", value: adt.location },
  { label: "Location Type", value: adt.physicalType },
  { label: "Participants", value: adt.participantsDisplay },
  { label: "Diagnosis", value: adt.diagnoses?.join(", ") },
  { label: "Discharge Disposition", value: adt.dischargeDisposition },
];

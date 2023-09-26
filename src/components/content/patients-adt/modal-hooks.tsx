import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { EncounterModel } from "@/fhir/models/encounter";

const encountersAndNotes = (adt: EncounterModel) => (
  <RelatedEncounters encounters={adt.relatedEncounter ? [adt.relatedEncounter] : []} />
);

function RelatedEncounters({ encounters }: { encounters: EncounterModel[] }) {
  if (encounters.length === 0) {
    return null;
  }
  return (
    <div>
      <h4 className="text-base font-semibold">Related Encounters</h4>
      <ul className="list-disc list-inside">
        {encounters.map((encounter) => (
          <li key={encounter.id}>{encounter.typeDisplay}</li>
        ))}
      </ul>
    </div>
  );
}

export function useADTAlertDetailsDrawer() {
  return useResourceDetailsDrawer({
    header: (adt) =>
      `${adt.patient?.display}${
        adt.patient?.gender ? ` (${adt.patient.gender[0].toUpperCase()})` : ""
      }`,
    subHeader: (adt) => `${adt.patient?.dob} (${adt.patient?.age})`,
    getSourceDocument: true,
    details: encounterData,
    enableDismissAndReadActions: false, // We haven't gotten to supporting this yet
    renderChild: encountersAndNotes,
  });
}

export const encounterData = (adt: EncounterModel) => [
  { label: "Start Date", value: adt.periodStart },
  { label: "End Date", value: adt.periodEnd },
  { label: "Type", value: adt.typeDisplay },
  { label: "Location", value: adt.location },
  { label: "Participants", value: adt.participantsDisplay },
  { label: "Diagnosis", value: adt.diagnoses?.join(", ") },
  { label: "Discharge Disposition", value: adt.dischargeDisposition },
];

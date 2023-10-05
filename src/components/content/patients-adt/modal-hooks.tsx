import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DocumentButton } from "../CCDA/document-button";
import { useCCDAModal } from "../CCDA/modal-ccda";
import { NotesEntry } from "../resource/helpers/notes-entry";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { EncounterModel } from "@/fhir/models/encounter";

const encountersAndNotes = (adt: EncounterModel) => (
  <RelatedEncounter encounter={adt.relatedEncounter} />
);

function RelatedEncounter({ encounter }: { encounter?: EncounterModel }) {
  const openCCDAModal = useCCDAModal();

  const binaryId = encounter?.binaryId;

  if (!encounter) {
    return null;
  }
  return (
    <div className="ctw-space-y-4">
      <h4 className="ctw-text-lg ctw-font-semibold">Encounters & Notes</h4>
      <NotesEntry
        summary={
          <div className="ctw-flex ctw-grow ctw-justify-between">
            <div className="ctw-flex ctw-space-x-6">
              <div>{encounter.periodStart}</div>
              <div className="ctw-font-medium ctw-text-content-black">{encounter.typeDisplay}</div>
            </div>
            <div className="ctw-flex ctw-items-center">
              <FontAwesomeIcon icon={faFileLines} className="ctw-text-content-light" />
            </div>
          </div>
        }
        details={[
          {
            label: "Start Date",
            value: encounter.periodStart,
          },
          {
            label: "End Date",
            value: encounter.periodEnd,
          },
          {
            label: "Location",
            value: encounter.location,
          },
          {
            label: "Diagnosis",
            value: encounter.diagnoses?.join(";\n"),
          },
          {
            label: "Discharge Disposition",
            value: encounter.dischargeDisposition,
          },
        ]}
        documentButton={
          binaryId && (
            <DocumentButton
              onClick={() => {
                void openCCDAModal(binaryId, "Source Document");
              }}
              text="Source Document"
            />
          )
        }
        hideEmpty={false}
      />
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
    renderChild: encountersAndNotes,
    enableDismissAndReadActions: true,
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

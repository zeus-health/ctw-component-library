import { ResourceTitleColumn } from "../../resource/helpers/resource-title-column";
import { TableColumn } from "@/components/core/table/table-helpers";
import { EncounterModel } from "@/fhir/models/encounter";
import { compact } from "@/utils/nodash";

export const patientEncounterColumns = (builderId: string): TableColumn<EncounterModel>[] => [
  {
    title: "Date",
    widthPercent: 10,
    minWidth: 120,
    dataIndex: "dateDisplay",
  },
  {
    title: "Title",
    render: (encounter) => (
      <ResourceTitleColumn
        title={encounter.typeDisplay}
        ownedByBuilder={encounter.ownedByBuilder(builderId)}
      />
    ),
  },
  {
    title: "Provider",
    render: (encounter) => (
      <>
        {compact([encounter.participants, encounter.location]).map((detail) => (
          <div className="ctw-capitalize" key={detail}>
            {detail.toLocaleLowerCase()}
          </div>
        ))}
        {encounter.typeSpecialty && <div>Speciality: {encounter.typeSpecialty}</div>}
      </>
    ),
  },
  {
    title: "Details",
    render: (encounter) => {
      const { dischargeDisposition } = encounter;
      const diagnoses = compact(encounter.diagnoses);
      const notes = encounter.clinicalNotes.map((note) => note.title ?? "").sort();
      return (
        <div>
          {dischargeDisposition && <div>Discharge: {dischargeDisposition}</div>}
          {notes.length > 0 && (
            <div>
              {notes.length} note{notes.length > 1 ? "s" : ""}
            </div>
          )}
          {diagnoses.length > 0 && (
            <div>
              {diagnoses.length} {diagnoses.length > 1 ? "diagnoses" : "diagnosis"}
            </div>
          )}
        </div>
      );
    },
  },
];

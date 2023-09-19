import { ResourceTitleColumn } from "../../resource/helpers/resource-title-column";
import { SimpleMoreList } from "@/components/core/simple-more-list";
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
        {encounter.location && <div className="ctw-pb-2">Location: {encounter.location}</div>}
        {encounter.typeSpecialty && (
          <div className="ctw-pb-2">Speciality: {encounter.typeSpecialty}</div>
        )}
        {encounter.participants && encounter.participants.length > 0 && (
          <SimpleMoreList
            className="ctw-pb-2"
            items={encounter.participants}
            limit={2}
            total={encounter.participants.length}
            prefix="Providers:"
          />
        )}
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
          {dischargeDisposition && (
            <div className="ctw-pb-2">Discharge: {dischargeDisposition}</div>
          )}
          {diagnoses.length > 0 && (
            <SimpleMoreList
              className="ctw-pb-2"
              items={diagnoses}
              limit={1}
              total={diagnoses.length}
              prefix="Diagnoses:"
            />
          )}
          {notes.length > 0 && (
            <div>
              {notes.length} note{notes.length > 1 ? "s" : ""}
            </div>
          )}
        </div>
      );
    },
  },
];

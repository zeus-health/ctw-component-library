import { ResourceTitleColumn } from "../../resource/helpers/resource-title-column";
import { SimpleMoreList } from "@/components/core/simple-more-list";
import { TableColumn } from "@/components/core/table/table-helpers";
import { EncounterModel } from "@/fhir/models/encounter";
import { compact } from "@/utils/nodash";

export const patientEncounterColumns: TableColumn<EncounterModel>[] = [
  {
    title: "Date",
    widthPercent: 10,
    minWidth: 120,
    dataIndex: "periodStart",
  },
  {
    title: "Title",
    render: (encounter) => (
      <div>
        <div>{encounter.typeDisplay}</div>
      </div>
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
      </>
    ),
  },
  {
    title: "Details",
    render: (encounter) => {
      const diagnoses = compact(encounter.diagnoses);
      const notes = encounter.clinicalNotes.map((note) => note.noteTitle);
      return (
        <div>
          {notes.length > 0 && (
            <SimpleMoreList items={notes} limit={3} total={notes.length} prefix="Notes:" />
          )}
          {diagnoses.length > 0 && (
            <SimpleMoreList
              items={diagnoses}
              limit={3}
              total={diagnoses.length}
              prefix="Diagnosis:"
            />
          )}
        </div>
      );
    },
  },
];

export const patientEncountersAllColumns = (builderId: string): TableColumn<EncounterModel>[] => [
  {
    title: "Date",
    widthPercent: 10,
    minWidth: 120,
    dataIndex: "periodStart",
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
      </>
    ),
  },
  {
    title: "Details",
    render: (encounter) => {
      const diagnoses = compact(encounter.diagnoses);
      const notes = encounter.clinicalNotes.map((note) => note.noteTitle);
      return (
        <div>
          {notes.length > 0 && (
            <SimpleMoreList items={notes} limit={3} total={notes.length} prefix="Notes:" />
          )}
          {diagnoses.length > 0 && (
            <SimpleMoreList
              items={diagnoses}
              limit={3}
              total={diagnoses.length}
              prefix="Diagnosis:"
            />
          )}
        </div>
      );
    },
  },
];

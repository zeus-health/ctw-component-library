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
    title: "Organization",
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
      return (
      <div>
        {/* TODO: add clinical notes to encounter table CDEV-306 */}
        {diagnoses.length > 0  && (
          <SimpleMoreList
            items={diagnoses}
            limit={3}
            total={diagnoses.length}
            prefix="Diagnosis:"
          />
        )}
      </div>
    )},
  },
];

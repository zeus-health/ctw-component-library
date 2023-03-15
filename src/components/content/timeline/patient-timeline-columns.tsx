import { SimpleMoreList } from "@/components/core/simple-more-list";
import { TableColumn } from "@/components/core/table/table-helpers";
import { ViewFHIR } from "@/components/core/view-fhir";
import { EncounterModel } from "@/fhir/models/encounter";

export const patientTimelineColumns = (includeViewFhirResource = true) => {
  const timellineColumns: TableColumn<EncounterModel>[] = [
    {
      title: "Date",
      widthPercent: 10,
      minWidth: 120,
      render: (encounter) => (
        <div className="group-hover:ctw-underline">{encounter.periodStart}</div>
      ),
    },
    {
      title: "Type",
      widthPercent: 20,
      minWidth: 150,
      render: (encounter) => (
        <div>
          <div>Encounter</div>
          <div>{encounter.typeDisplay}</div>
        </div>
      ),
    },
    {
      title: "Provider",
      widthPercent: 25,
      minWidth: 200,
      render: (encounter) => {
        const { participant } = encounter.resource;
        if (!participant || participant.length === 0) return null;

        const items = participant.map((p) => {
          const name = p.individual?.display ?? "";
          let qualification = p.type?.[0].text ?? "";
          if (["noinformation", "unk"].includes(qualification.toLowerCase())) {
            qualification = "";
          }
          if (name && qualification) {
            return `${name} (${qualification})`;
          }
          return name || qualification;
        });

        return (
          <div>
            <SimpleMoreList
              items={items}
              limit={6}
              total={participant.length}
            />
            <div>{encounter.location}</div>
          </div>
        );
      },
    },
    {
      widthPercent: 45,
      minWidth: 250,
      render: (encounter) => {
        const { diagnosis } = encounter.resource;
        if (!diagnosis || diagnosis.length === 0) return null;

        return (
          <div>
            <SimpleMoreList
              items={diagnosis.map((d) => d.condition.display ?? "")}
              limit={3}
              total={diagnosis.length}
            />
          </div>
        );
      },
    },
  ];

  if (includeViewFhirResource) {
    timellineColumns.push({
      widthPercent: 10,
      minWidth: 200,
      render: (encounter) => (
        <ViewFHIR name="Encounter Resource" resource={encounter.resource} />
      ),
    });
  }

  return timellineColumns;
};

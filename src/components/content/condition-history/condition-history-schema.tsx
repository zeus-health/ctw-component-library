import { CodingList } from "@/components/core/coding-list";
import { CollapsibleDataListProps } from "@/components/core/collapsible-data-list";
import { NotesList } from "@/components/core/notes-list";
import { ConditionModel } from "@/fhir/models";
import { capitalize, startCase } from "@/utils/nodash";

export function setupData(condition: ConditionModel): CollapsibleDataListProps {
  const detailData = [
    {
      label: "Recorder",
      value: condition.recorder,
    },
    {
      label: "Clinical Status",
      value: capitalize(condition.clinicalStatus),
    },
    {
      label: "Verification Status",
      value: capitalize(condition.verificationStatus),
    },
    {
      label: "Recorded Date",
      value: condition.recordedDate,
    },
    {
      label: "Category",
      value: startCase(condition.categories[0]),
    },
    {
      label: "Note",
      value: condition.notes.length !== 0 && (
        <NotesList notes={condition.notes} />
      ),
    },
    {
      label: "Code",
      value: <CodingList codings={condition.knownCodings} />,
    },
    {
      label: "Onset Date",
      value: condition.onset,
    },
    {
      label: "Abatement Date",
      value: condition.abatement,
    },
    {
      label: "Encounter",
      value: condition.encounter,
    },
  ];

  return {
    id: condition.id,
    date: condition.recordedDate,
    title: startCase(condition.categories[0]),
    subtitle: condition.patient?.organization?.name,
    data: detailData,
  };
}

export const conditionData = (condition: ConditionModel) => [
  { label: "Recorder", value: condition.recorder },
  { label: "Recorded Date", value: condition.recordedDate },
  {
    label: "Provider Organization",
    value: condition.patient?.organization?.name,
  },
  { label: "Status", value: capitalize(condition.displayStatus) },
  { label: "Onset Date", value: condition.onset },
  { label: "Abatement Date", value: condition.abatement },
  {
    label: "Note",
    value: condition.notes.length !== 0 && (
      <NotesList notes={condition.notes} />
    ),
  },
];

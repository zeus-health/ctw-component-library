import { HistoryEntryProps } from "../../resource/helpers/history-entry";
import { useHistory } from "../../resource/history";
import { NotesList } from "@/components/core/notes-list";
import { ConditionModel } from "@/fhir/models";
import { capitalize, startCase } from "@/utils/nodash";
import { QUERY_KEY_CONDITION_HISTORY } from "@/utils/query-keys";

export function useConditionHistory(condition: ConditionModel) {
  return useHistory({
    resourceType: "Condition",
    model: condition,
    queryKey: QUERY_KEY_CONDITION_HISTORY,
    valuesToDedupeOn,
    getFiltersFQS,
    getHistoryEntry,
  });
}

function getFiltersFQS(condition: ConditionModel) {
  const tokens = condition.knownCodings.map((coding) => `${coding.system}|${coding.code}`);

  if (tokens.length > 0) {
    return {
      code: { anymatch: tokens },
    };
  }

  return undefined;
}

function getHistoryEntry(condition: ConditionModel): HistoryEntryProps {
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
      label: "Category",
      value: startCase(condition.category),
    },
    {
      label: "Note",
      value: condition.notes.length !== 0 && <NotesList notes={condition.notes} />,
    },
    {
      label: "Recorded Code(s)",
      value: (
        <div className="ctw-space-y-1">
          {condition.knownCodings.map((coding) => (
            <div key={`${coding.system}-${coding.code}`}>{coding.display}</div>
          ))}
        </div>
      ),
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
    versionId: condition.versionId,
    title: condition.patientOrganizationName,
    details: detailData,
  };
}

const valuesToDedupeOn = (condition: ConditionModel) => [
  condition.recorder,
  condition.clinicalStatus,
  condition.verificationStatus,
  condition.recordedDate,
  condition.notes,
  condition.category,
  condition.onset,
  condition.abatement,
  condition.encounter,
  condition.knownCodings.map((coding) => [coding.system, coding.code]),
];

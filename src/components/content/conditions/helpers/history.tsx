import { SearchParams } from "fhir-kit-client";
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
    getSearchParams,
    getFiltersFQS,
    getHistoryEntry,
  });
}

function getSearchParams(condition: ConditionModel) {
  const tokens = condition.knownCodings.map((coding) => `${coding.system}|${coding.code}`);

  const searchParams: SearchParams = {
    _include: ["Condition:patient", "Condition:encounter"],
    "_include:iterate": "Patient:organization",
  };

  // If we have any known codings, then do an OR search.
  // Otherwise fall back to searching for this single condition.
  // That way, conditions that don't have any good codes to match on
  // will only show themselves in the history.
  if (tokens.length > 0) {
    searchParams.code = tokens.join(",");
  } else {
    // eslint-disable-next-line no-underscore-dangle
    searchParams._id = condition.id;
  }

  return searchParams;
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
      value: startCase(condition.categories[0]),
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
  condition.categories[0],
  condition.onset,
  condition.abatement,
  condition.encounter,
  condition.knownCodings.map((coding) => [coding.system, coding.code]),
];

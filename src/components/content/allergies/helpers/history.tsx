import { AllergyModel } from "@/fhir/models/allergies";
import { QUERY_KEY_ALLERGY_HISTORY } from "@/utils/query-keys";
import { SearchParams } from "fhir-kit-client";
import { HistoryEntryProps } from "../../resource/helpers/history-entry";
import { useHistory } from "../../resource/history";

export function useAllergiesHistory(allergy: AllergyModel) {
  return useHistory({
    resourceType: "AllergyIntolerance",
    model: allergy,
    queryKey: QUERY_KEY_ALLERGY_HISTORY,
    valuesToDedupeOn,
    getSearchParams,
    getHistoryEntry,
  });
}

function getSearchParams(allergy: AllergyModel) {
  const tokens = allergy.knownCodings.map(
    (coding) => `${coding.system}|${coding.code}`
  );

  const searchParams: SearchParams = {
    _include: ["AllergyIntolerance:patient"],
  };

  // If we have any known codings, then do an OR search.
  // Otherwise fall back to searching for this single condition.
  // That way, conditions that don't have any good codes to match on
  // will only show themselves in the history.
  if (tokens.length > 0) {
    searchParams.code = tokens.join(",");
  } else {
    // eslint-disable-next-line no-underscore-dangle
    searchParams._id = allergy.id;
  }

  return searchParams;
}

function getHistoryEntry(allergy: AllergyModel): HistoryEntryProps {
  const detailData = [
    {
      label: "Name",
      value: allergy.display,
    },
    {
      label: "Recorded Date",
      value: allergy.recordedDate,
    },
  ];

  return {
    id: allergy.id,
    date: allergy.recordedDate,
    versionId: allergy.versionId,
    details: detailData,
  };
}

const valuesToDedupeOn = (allergy: AllergyModel) => [
  allergy.knownCodings.map((coding) => `${coding.system}|${coding.code}`),
];

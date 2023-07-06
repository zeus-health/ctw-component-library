import { AllergyIntolerance } from "fhir/r4";
import { SearchParams } from "fhir-kit-client";
import { HistoryEntryProps } from "../../resource/helpers/history-entry";
import { useHistory } from "../../resource/history";
import { AllergyModel } from "@/fhir/models/allergies";
import { capitalize } from "@/utils/nodash";
import { QUERY_KEY_ALLERGY_HISTORY } from "@/utils/query-keys";

export function useAllergiesHistory(allergy: AllergyModel) {
  return useHistory({
    resourceType: "AllergyIntolerance",
    model: allergy,
    queryKey: QUERY_KEY_ALLERGY_HISTORY,
    includeVersionHistory: false,
    valuesToDedupeOn,
    getSearchParams,
    getHistoryEntry,
    clientSideFiltersFQS,
  });
}

function getSearchParams(allergy: AllergyModel) {
  const tokens = allergy.knownCodings.map((coding) => `${coding.system}|${coding.code}`);

  const searchParams: SearchParams = {
    _include: ["AllergyIntolerance:patient"],
    "_include:iterate": "Patient:organization",
  };

  if (tokens.length > 0) {
    searchParams.code = tokens.join(",");
  } else {
    // eslint-disable-next-line no-underscore-dangle
    searchParams._id = allergy.id;
  }

  return searchParams;
}

function clientSideFiltersFQS(model: AllergyModel, allergies: AllergyIntolerance[]) {
  const tokens = model.knownCodings.map((coding) => `${coding.system}|${coding.code}`);
  return allergies.filter((allergy) => {
    const modelTokens = allergy.code?.coding?.map((coding) => `${coding.system}|${coding.code}`);
    // Sometimes data doesn't have known codings, so we also match on the code.text making sure that it is not blank.
    const matchingCodeDisplay = model.codeText && allergy.code?.text === model.codeText;
    const matchingSystemCode = modelTokens?.some((token) => tokens.includes(token));
    return matchingSystemCode || matchingCodeDisplay;
  });
}

function getHistoryEntry(allergy: AllergyModel): HistoryEntryProps {
  const detailData = [
    { label: "Status", value: allergy.clinicalStatus },
    { label: "Type", value: capitalize(allergy.type) },
    { label: "Onset", value: allergy.onset },
    { label: "Reaction", value: capitalize(allergy.manifestations) },
    { label: "Severity", value: capitalize(allergy.severity) },
    { label: "Note", value: allergy.note },
  ];

  return {
    id: allergy.id,
    date: allergy.recordedDate,
    versionId: allergy.versionId,
    title: allergy.managingOrganization,
    details: detailData,
  };
}

const valuesToDedupeOn = (allergy: AllergyModel) => [
  allergy.recordedDate,
  allergy.managingOrganization,
  allergy.clinicalStatus,
  allergy.onset,
  allergy.manifestations,
  allergy.severity,
  allergy.note,
  allergy.knownCodings.map((coding) => [coding.system, coding.code]),
];

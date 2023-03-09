import { ConditionModel } from "@/fhir/models";
import { ResourceMap } from "@/fhir/types";
import { isEqual, orderBy, uniqWith } from "@/utils/nodash";

export const applyConditionHistoryFilters = (
  data: fhir4.Condition[],
  includedResources: ResourceMap
) => {
  let conditionsDataDeduped = [];

  const conditionModels = data.map(
    (c) => new ConditionModel(c, includedResources)
  );

  // We sort by hasEnrichment as well because we want enriched records to be preferred in uniqWith function.
  const sortedConditions = orderBy(
    conditionModels,
    [(c) => c.resource.recordedDate ?? "", (c) => c.hasEnrichment],
    "desc"
  );

  conditionsDataDeduped = uniqWith(sortedConditions, (a, b) =>
    isEqual(valuesToDedupeOn(a), valuesToDedupeOn(b))
  );

  // Sort by recordedDate and then version id because recorded date is can be a flat date.
  return orderBy(
    conditionsDataDeduped,
    [(c) => c.resource.recordedDate ?? "", (c) => c.resource.meta?.versionId],
    ["desc", "desc"]
  );
};

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

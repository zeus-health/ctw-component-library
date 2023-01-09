import { isEqual, orderBy, uniqWith } from "lodash";
import { ConditionModel } from "@/fhir/models";
import { ResourceMap } from "@/fhir/types";

export const applyConditionHistoryFilters = (
  data: fhir4.Condition[],
  includedResources: ResourceMap
) => {
  let conditionsDataDeduped = [];

  const conditionModels = data
    .map((c) => new ConditionModel(c, includedResources))
    .filter((c) => c.verificationStatus !== "entered-in-error");

  const sortedConditions = orderBy(
    conditionModels,
    (c) => c.resource.recordedDate ?? "",
    "desc"
  );

  conditionsDataDeduped = uniqWith(sortedConditions, (a, b) =>
    isEqual(valuesToDedupeOn(a), valuesToDedupeOn(b))
  );

  return conditionsDataDeduped;
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
  condition.knownCodings.map((coding) => [
    coding.display,
    coding.system,
    coding.code,
  ]),
];

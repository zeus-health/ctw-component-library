import { AllergyModel } from "@/fhir/models/allergies";
import { ResourceMap } from "@/fhir/types";
import { isEqual, uniqWith } from "@/utils/nodash";

export const applyAllergyFilters = (
  data: fhir4.AllergyIntolerance[],
  includedResources: ResourceMap
) => {
  const allergyModel = data.map(
    (allergy) => new AllergyModel(allergy, includedResources)
  );
  const allergyData = uniqWith(allergyModel, (a, b) =>
    isEqual(valuesToDedupeOn(a), valuesToDedupeOn(b))
  );

  return allergyData;
};

const valuesToDedupeOn = (allergy: AllergyModel) => [
  allergy.display,
  allergy.recordedDate,
  allergy.managingOrganization,
  allergy.knownCodings,
];

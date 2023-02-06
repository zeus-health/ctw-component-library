import { AllergyModel } from "@/fhir/models/allergies";
import { isEqual, uniqWith } from "@/utils/nodash";

export const applyAllergyFilters = (data: fhir4.AllergyIntolerance[]) => {
  const allergyModel = data.map((allergy) => new AllergyModel(allergy));
  const allergyData = uniqWith(allergyModel, (a, b) =>
    isEqual(valuesToDedupeOn(a), valuesToDedupeOn(b))
  );

  return allergyData;
};

const valuesToDedupeOn = (allergy: AllergyModel) => [
  allergy.categories,
  allergy.clinicalStatus,
  allergy.display,
  allergy.manifestations,
  allergy.onset,
  allergy.type,
];

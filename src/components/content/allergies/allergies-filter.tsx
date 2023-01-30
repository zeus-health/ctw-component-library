import { AllergyModel } from "@/fhir/models/allergies";
import { pick, uniqBy } from "@/utils/nodash/fp";

export const applyAllergyFilters = (data: fhir4.AllergyIntolerance[]) =>
  uniqBy(
    pickDedupeValues,
    data.map((allergy) => new AllergyModel(allergy))
  );

const pickDedupeValues = pick([
  "categories",
  "clinicalStatus",
  "display",
  "manifestations",
  "onset",
  "type",
]);

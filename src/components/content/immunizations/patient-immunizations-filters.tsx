import { ImmunizationModel } from "@/fhir/models/immunization";
import { pick, uniqBy } from "@/utils/nodash/fp";

export const applyImmunizationFilters = (data: fhir4.Immunization[]) =>
  uniqBy(
    pickDedupeValues,
    data.map((immunization) => new ImmunizationModel(immunization))
  );
const pickDedupeValues = pick(["description", "cvxCode", "occurance"]);

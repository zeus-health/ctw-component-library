import { ImmunizationModel } from "@/fhir/models/immunization";
import { isEqual, uniqWith } from "@/utils/nodash";

export const applyImmunizationFilters = (data: fhir4.Immunization[]) => {
  const immunizationModel = data.map(
    (immunization) => new ImmunizationModel(immunization)
  );
  const immunizationData = uniqWith(immunizationModel, (a, b) =>
    isEqual(valuesToDedupeOn(a), valuesToDedupeOn(b))
  );

  return immunizationData;
};

const valuesToDedupeOn = (immunization: ImmunizationModel) => [
  immunization.description,
  immunization.cvxCode,
  immunization.occurrence,
];

import { get, groupBy, has, mapValues, orderBy, pipe } from "lodash/fp";
import { dateToISO } from "@/fhir/formatters";
import { MedicationModel } from "@/fhir/models";

const getMedicationValue = (medication: MedicationModel) => {
  const coding = get("resource.medicationCodeableConcept.coding.0", medication);
  if (coding) {
    return `${coding.system}_${coding.code}`;
  }
  return "";
};
const getDateValue = (medication: MedicationModel) => {
  const uniformDate = new Date(medication.dateLocal ?? 0);
  return dateToISO(uniformDate);
};

const getDateTimeValue = (medication: MedicationModel) => {
  const uniformDate = new Date(medication.dateLocal ?? 0);
  return uniformDate.getTime();
};

/**
 * Sorts Medication models by date desc, insuring that med requests and med
 * dispenses aren't out of order (need to request a med before filling it).
 * - Group resources by date.
 * - Map groups to tuples [resource, resourceType, order].
 * - Iterate/Reduce over that list of tuples:
 * ... - If we see a medRequest, cache mapping { [med]: order }.
 * ... - If we see a medDispense, check for mapping of med in cache.
 * ... - If we have a cache for that med, then the medDispense is out of order,
 * ... ... and we can fix it by changing its order value to cache[med] + 0.5.
 * - Recombine the sorted resources.
 */
export const sortMedHistory = (resources: MedicationModel[]) => {
  const createTuples = (medication: MedicationModel, index: number) => [
    medication,
    medication.resourceType,
    index,
  ];

  const sortedInGroups = pipe(
    groupBy(getDateValue),
    mapValues((group) => orderBy(getDateTimeValue, "desc", group)),
    mapValues((group) => group.map(createTuples)),
    mapValues((group: [MedicationModel, string, number][] = []) => {
      const cache: Record<string, number> = {};

      const updated = group.map(([model, type, sortOrder]) => {
        const medicationName = getMedicationValue(model);
        if (type === "MedicationRequest") {
          cache[medicationName] = sortOrder;
        } else if (
          type === "MedicationDispense" &&
          has(medicationName, cache)
        ) {
          // This MedicationDispense is out of order.
          return { model, type, sortOrder: sortOrder + 0.5 };
        }

        return { model, type, sortOrder };
      });

      return orderBy(get("sortOrder"), "desc", updated).map(get("model"));
    })
  )(resources);

  const sortedKeys = orderBy(
    (key) => new Date(key).getTime(),
    "desc",
    Object.keys(sortedInGroups)
  );

  return sortedKeys
    .map((key) => sortedInGroups[key])
    .reduce((acc, group): MedicationModel[] => [...acc, ...group]);
};

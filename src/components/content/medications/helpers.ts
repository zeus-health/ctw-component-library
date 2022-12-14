import {
  concat,
  get,
  groupBy,
  keys,
  mapValues,
  orderBy,
  pipe,
} from "lodash/fp";
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
  const uniformDate = new Date(medication.date ?? 0);
  if (medication.resourceType === "MedicationRequest") {
    return uniformDate.getTime() - 1;
  }
  return uniformDate.getTime();
};

/**
 * Sorts Medication models by date desc, insuring that med requests and med
 * dispenses aren't out of order (need to request a med before filling it).
 * - Group resources by date.
 * - Map groups to 3-tuples [resource, resourceType, order].
 * - Sort (and fix) the history of each date `sortMedHistoryForASingleDate`
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
    mapValues((group) => orderBy(getDateTimeValue, "asc", group)),
    mapValues((group) => group.map(createTuples)),
    mapValues(sortMedHistoryForASingleDate)
  )(resources);

  const sortedKeys = orderBy(
    (key) => new Date(key).getTime(),
    "desc",
    keys(sortedInGroups)
  );

  return sortedKeys.map((key) => sortedInGroups[key]).reduce(concat);
};

/**
 * Sort/Fix the Medication History for a single Date.
 * - Iterate/Reduce over each group of 3-tuple arrays:
 * ... - If we see a medDispense, map med to order in list Map<[med]: number>.
 * ... - If we see a medRequest, check for mapping of that med. If we do have
 * ... ... a mapping for that med, we know the medDispense is out of order!
 * ... ... Then we can fix it by updating its sort order to be slightly lower
 * ... ... than the order of the mapped medDispense.
 */
function sortMedHistoryForASingleDate(
  group: [MedicationModel, string, number][] = []
) {
  const cache: Map<string, number> = new Map();

  const updated = group.map(([model, type, sortOrder]) => {
    const medicationName = getMedicationValue(model);
    if (type === "MedicationDispense") {
      cache.set(medicationName, sortOrder);
    } else if (cache.has(medicationName) && type === "MedicationRequest") {
      // This MedicationRequest is out of order.
      const medDispenseOrder = cache.get(medicationName) as number;
      return { model, type, sortOrder: medDispenseOrder - 0.1 };
    }

    return { model, type, sortOrder };
  });
  return orderBy(get("sortOrder"), "desc", updated).map(get("model"));
}

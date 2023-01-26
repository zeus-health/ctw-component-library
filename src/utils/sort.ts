import { isString, orderBy } from "@/utils/nodash";
import { get } from "@/utils/nodash/fp";

export type SortDir = "asc" | "desc";

type GetValueFunction<T> = (c: T) => unknown;

export function sort<T>(
  collection: T[],
  getValue: GetValueFunction<T> | string,
  order: SortDir,
  isDate = false
) {
  const getValueFn = isString(getValue) ? get(getValue) : getValue;
  if (isDate) return sortByDate(collection, getValueFn, order);
  return orderBy(collection, getValue, order);
}

function sortByDate<T>(
  collection: T[],
  getValue: GetValueFunction<T>,
  order: "asc" | "desc"
) {
  collection.sort((a, b) => {
    const aDate = getValue(a) as string | undefined;
    const bDate = getValue(b) as string | undefined;
    if (!aDate && !bDate) {
      return 0;
    }
    if (!aDate) {
      return order === "asc" ? -1 : 1;
    }
    if (!bDate) {
      return order === "asc" ? 1 : -1;
    }

    const dateA = new Date(aDate).getTime();
    const dateB = new Date(bDate).getTime();

    if (order === "asc") {
      return dateA - dateB;
    }

    return dateB - dateA;
  });
  return collection;
}

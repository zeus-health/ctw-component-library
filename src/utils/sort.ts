import { isString, orderBy } from "lodash";
import { get } from "lodash/fp";

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

export const alphaSortBlankLast = (
  a: string | undefined,
  b: string | undefined,
  dir: SortDir
) => {
  const aIsBlank = !a || a === "";
  const bIsBlank = !b || b === "";
  if (aIsBlank && bIsBlank) {
    return 0;
  }
  if (aIsBlank) {
    return 1;
  }
  if (bIsBlank) {
    return -1;
  }
  return dir === "asc" ? a.localeCompare(b) : b.localeCompare(a);
};

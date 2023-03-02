import { isEmptyValue } from "./types";
import { isString, orderBy } from "@/utils/nodash";
import { get } from "@/utils/nodash/fp";

export type SortDir = "asc" | "desc";

export type Sort<T extends object> = {
  dir: SortDir;
  isDate?: boolean;
  key: keyof T;
};

type GetValueFunction<T> = (c: T) => unknown;

type Comparator<T> = (a: T) => unknown;
export function applySorts<T extends object>(records: T[], sorts: Sort<T>[]) {
  const dateIteratee =
    (column: keyof T): Comparator<T> =>
    (record: T) => {
      const value = record[column];
      if (!isString(value) || !value) {
        return 0;
      }
      return new Date(value).getTime();
    };

  // Makes a list of iteratees, where each index iteratee is preceded by an iteratee that ensures blanks go last.
  const iteratees: (Comparator<T> | keyof T)[] = [];
  const orders: SortDir[] = [];
  sorts.forEach((sortEntry) => {
    const { key, dir, isDate } = sortEntry;
    iteratees.push(
      (o) => isEmptyValue(o[key]),
      isDate ? dateIteratee(key) : key
    );
    orders.push("asc", dir);
  });

  return orderBy(records, iteratees, orders);
}

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

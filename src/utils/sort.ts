import { SortDir } from "@/components/core/table/table";
import { isString, orderBy } from "lodash";
import { get } from "lodash/fp";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Newable<T> = new (...args: any[]) => T;

export function getSortInfo<T>(model: Newable<T>, sortValue?: string | null) {
  if (!sortValue) {
    return {};
  }
  const [sortColumn, sortOrder] = sortValue.split(" ");

  if (!sortColumn || !sortOrder) {
    return {};
  }

  if (!["asc", "desc"].includes(sortOrder)) {
    return {};
  }

  if (!Object.getOwnPropertyNames(model.prototype).includes(sortColumn)) {
    return {};
  }

  return {
    sortColumn: sortColumn as keyof T,
    sortOrder,
  };
}

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
  order: SortDir
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

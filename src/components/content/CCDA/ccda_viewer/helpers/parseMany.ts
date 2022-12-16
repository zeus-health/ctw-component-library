import { isEmpty } from "lodash";

export function parseMany<T>(
  parser: (el: Document) => T,
  data: Document[]
): T[] {
  if (isEmpty(data)) return [];

  return data.map((val) => parser(val));
}

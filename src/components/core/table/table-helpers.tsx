import { SortDir } from "./table";

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

import { ModifiedHumanName } from "../types";
import { isArray, isEmpty } from "@/utils/nodash";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isHumanNameArray(data: any): data is ModifiedHumanName[] {
  return isArray(data) && data.every((name) => typeof name === "object");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isStringArray(data: any): data is string[] {
  return isArray(data) && data.every((name) => typeof name === "string");
}

const nameParser = (name: ModifiedHumanName) => {
  if (name.text) return name.text;
  let displayName = "";
  if (name.given && name.given.length > 0) {
    displayName = name.given.join(" ");
    if (name.family) displayName = `${displayName} ${name.family}`;
  }
  if (name.prefix && name.prefix.length > 0) {
    displayName = `${name.prefix.join(" ")} ${displayName}`;
  }
  return displayName;
};

export const displayForName = (
  humanName: ModifiedHumanName[] | ModifiedHumanName | string | string[]
): string => {
  if (isEmpty(humanName)) return "";

  if (typeof humanName === "string") return humanName;

  if (isStringArray(humanName)) {
    return humanName.reduce((acc, val, index) => {
      const withNewLine = index === 0 ? "" : "\n";
      return `${acc}${withNewLine}${val}`;
    }, "");
  }

  if (isHumanNameArray(humanName)) return humanName.map(nameParser).join(", ");

  return nameParser(humanName);
};

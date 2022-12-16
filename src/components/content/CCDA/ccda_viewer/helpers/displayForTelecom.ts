import { capitalize, isArray, isEmpty } from "lodash";
import { ModifiedContactPoint } from "../types";

const telecomParser = ({ use, system, value }: ModifiedContactPoint) => {
  const withUse = use ? ` (${use})` : "";
  const withSystem = system ? `${capitalize(system)}${withUse}:` : "";
  return `${withSystem} ${value}`.trim();
};

export const displayForTelecom = (
  telecom: ModifiedContactPoint | ModifiedContactPoint[]
): string => {
  if (isEmpty(telecom)) return "";

  if (isArray(telecom)) return telecom.map(telecomParser).join("\n");

  return telecomParser(telecom);
};

import { Env } from "..";
import { getFormsConditionsUrl } from "./urls";

export const getAutoCompleteConditions = async (
  authToken: string,
  env: Env,
  searchTerm: string
) => {
  const response = await fetch(
    `${getFormsConditionsUrl(env)}?display=${searchTerm}`,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
  const data = await response.json();
  return data.conditionsList;
};

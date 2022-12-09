import { Env } from "..";
import { getFormsConditionsUrl } from "./urls";
import { ctwFetch } from "@/utils/request";

export const getAutoCompleteConditions = async (
  authToken: string,
  env: Env,
  searchTerm: string
) => {
  const response = await ctwFetch(
    `${getFormsConditionsUrl(env)}?display=${searchTerm}`,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
  const data = await response.json();
  return data.conditionsList;
};

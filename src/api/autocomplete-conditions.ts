import { QueryFunctionContext } from "@tanstack/react-query";
import { Env } from "..";
import { getFormsConditionsUrl } from "./urls";

export type QueryKeyAutoCompleteConditions = [string, string, Env, string];

export const getAutoCompleteConditions = async (
  queryParams: QueryFunctionContext<QueryKeyAutoCompleteConditions>
) => {
  const { queryKey } = queryParams;
  const [_, authToken, env, searchTerm] = queryKey;

  const response = await fetch(
    `${getFormsConditionsUrl(env)}?display=${searchTerm}`,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
  const data = await response.json();
  return data.conditionsList;
};

import { QueryFunctionContext } from "@tanstack/react-query";
import { FORMS_CONDITIONS_URL } from "./urls";

export type QueryKeyAutoCompleteConditions = [string, string, string];

export const getAutoCompleteConditions = async (
  queryParams: QueryFunctionContext<QueryKeyAutoCompleteConditions>
) => {
  const { queryKey } = queryParams;
  const [_, authToken, searchTerm] = queryKey;

  const response = await fetch(
    `${FORMS_CONDITIONS_URL}?display=${searchTerm}`,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
  const data = await response.json();
  return data.conditionsList;
};

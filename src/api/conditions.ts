import { QueryFunctionContext } from "@tanstack/react-query";

export type QueryKeyAutoCompleteConditions = [string, string, string];

export const getAutoCompleteConditions = async (
  queryParams: QueryFunctionContext<QueryKeyAutoCompleteConditions>
) => {
  const { queryKey } = queryParams;
  const [_, authToken, searchTerm] = queryKey;

  // TODO: update to add url in system like url area.
  const response = await fetch(
    `https://api.dev.zusapi.com/forms-data/terminology/conditions?display=${searchTerm}`,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
  const data = await response.json();
  return data.conditionsList;
};

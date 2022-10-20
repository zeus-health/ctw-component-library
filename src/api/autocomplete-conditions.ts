import { QueryFunctionContext } from "@tanstack/react-query";
import React from "react";
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

export const setAutoCompleteConditions = async (
  authToken: string,
  env: Env,
  searchTerm: string,
  setConditions: React.Dispatch<
    React.SetStateAction<fhir4.Coding[] | undefined>
  >
) => {
  const response = await fetch(
    `${getFormsConditionsUrl(env)}?display=${searchTerm}`,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
  const data = await response.json();
  setConditions(data.conditionsList);
};

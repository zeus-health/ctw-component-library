import { Env } from "..";
import { getFormsConditionsUrl } from "./urls";
import { CTWRequestContext } from "@/components/core/ctw-context";
import { ctwFetch } from "@/utils/request";

export const getAutoCompleteConditions = async (
  requestContext: CTWRequestContext,
  env: Env,
  searchTerm: string
) => {
  const { authToken, builderId } = requestContext;
  const response = await ctwFetch(
    `${getFormsConditionsUrl(env)}?display=${searchTerm}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
        ...(builderId && { "Zus-Account": builderId }),
      },
    }
  );
  const data = await response.json();
  return data.conditionsList;
};

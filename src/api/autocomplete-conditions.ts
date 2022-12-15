import { getFormsConditionsUrl } from "./urls";
import { CTWRequestContext } from "@/components/core/ctw-context";
import { ctwFetch } from "@/utils/request";

export const getAutoCompleteConditions = async (
  requestContext: CTWRequestContext,
  searchTerm: string
) => {
  const { authToken, contextBuilderId } = requestContext;
  const response = await ctwFetch(
    `${getFormsConditionsUrl(requestContext.env)}?display=${searchTerm}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
        ...(contextBuilderId && { "Zus-Account": contextBuilderId }),
      },
    }
  );
  const data = await response.json();
  return data.conditionsList;
};

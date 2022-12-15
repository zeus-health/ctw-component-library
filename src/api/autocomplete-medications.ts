import { CTWRequestContext } from "@/components/core/ctw-context";
import { Env } from "..";
import { getFormsMedicationsUrl } from "./urls";

export const getAutoCompleteMedications = async (
  requestContext: CTWRequestContext,
  searchTerm: string
) => {
  const { authToken, contextBuilderId } = requestContext;
  const response = await fetch(
    `${getFormsMedicationsUrl(requestContext.env)}?display=${searchTerm}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
        ...(contextBuilderId && { "Zus-Account": contextBuilderId }),
      },
    }
  );
  const data = await response.json();
  return data.data;
};

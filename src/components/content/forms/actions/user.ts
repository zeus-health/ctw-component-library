import { CreateOrEditConditionFormData } from "./conditions";
import { getZusApiBaseUrl } from "@/api/urls";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { ctwFetch } from "@/utils/request";

export const editUserPermissions = async (
  data: CreateOrEditConditionFormData,
  getRequestContext: () => Promise<CTWRequestContext>
): Promise<unknown> => {
  const requestContext = await getRequestContext();
  const authRole = "";

  const userEditPayload = {
    data: {
      type: "auth/users",
      id: data.id,
      relationships: {
        "auth/roles": {
          data: {
            type: "auth/roles",
            id: authRole,
          },
        },
      },
    },
  };

  const url = `${getZusApiBaseUrl(requestContext.env)}/auth/users/${data.id}`;
  const response = await ctwFetch(url, { body: JSON.stringify(userEditPayload), method: "PATCH" });

  return response;
};

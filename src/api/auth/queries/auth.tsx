import { getZusApiBaseUrl } from "../../urls";
import { JSONApiReponse } from "@/api/utils/types";
import { constructJSONUrl } from "@/api/utils/url";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { User } from "@/services/auth/users";
import { errorResponse } from "@/utils/errors";

export async function getUsers(
  requestContext: CTWRequestContext,
  count = 50,
  offset = 0
): Promise<JSONApiReponse<User>> {
  const baseUrl = new URL(`${getZusApiBaseUrl(requestContext.env)}/auth/users?`);
  const params = {
    "filter[builderId]": requestContext.contextBuilderId
      ? `${requestContext.contextBuilderId}`
      : "",
  };

  try {
    const response = await fetch(constructJSONUrl(baseUrl, params, count, offset), {
      headers: {
        Authorization: `Bearer ${requestContext.authToken}`,
      },
    });

    return response.json();
  } catch (e) {
    throw errorResponse("Failed fetching patients", e);
  }
}

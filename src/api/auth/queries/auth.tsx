import { getZusApiBaseUrl } from "../../urls";
import { JSONApiReponse } from "@/api/utils/types";
import { constructJSONUrl } from "@/api/utils/url";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useQueryWithCTW } from "@/components/core/providers/ctw-provider";
import { User } from "@/services/auth/users";
import { errorResponse } from "@/utils/errors";
import { QUERY_KEY_AUTH_ROLES } from "@/utils/query-keys";

const ALLOWED_ROLES = ["Builder Admin", "Care Team Member"];

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

export async function getAuthRoles(
  requestContext: CTWRequestContext
): Promise<JSONApiReponse<User>> {
  const baseUrl = new URL(`${getZusApiBaseUrl(requestContext.env)}/auth/roles?`);

  const params = new URLSearchParams(
    ALLOWED_ROLES.map((role) => ["fliter[name]", role])
  ).toString();
  const url = new URL(`${baseUrl}${decodeURIComponent(params)}`).href;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${requestContext.authToken}`,
      },
    });

    return response.json();
  } catch (e) {
    throw errorResponse("Failed fetching patients", e);
  }
}

export function useAuthRoles() {
  return useQueryWithCTW(QUERY_KEY_AUTH_ROLES, [], async (requestContext) =>
    getAuthRoles(requestContext)
  );
}

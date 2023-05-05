import { getZusApiBaseUrl } from "../../urls";
import { JSONApiReponse } from "@/api/utils/types";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { User } from "@/services/auth/users";
import { errorResponse } from "@/utils/errors";
import { omitBy } from "@/utils/nodash";

export async function getUsers(
  requestContext: CTWRequestContext,
  count = 50,
  offset = 0
): Promise<JSONApiReponse<User>> {
  const baseUrl = new URL(`${getZusApiBaseUrl(requestContext.env)}/auth/users?`);

  const paramsObj = omitBy(
    {
      sort: "email",
      "page[count]": String(count),
      "page[offset]": offset ? String(offset + count) : String(offset),
      "filter[builderId]": requestContext.contextBuilderId
        ? `${requestContext.contextBuilderId}`
        : "",
    },
    (value) => !value
  );

  const params = new URLSearchParams([...Object.entries(paramsObj)]).toString();
  const endpointUrl = new URL(`${baseUrl}${decodeURIComponent(params)}`);

  try {
    const response = await fetch(endpointUrl, {
      headers: {
        Authorization: `Bearer ${requestContext.authToken}`,
      },
    });

    return response.json();
  } catch (e) {
    throw errorResponse("Failed fetching patients", e);
  }
}

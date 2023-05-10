import { getZusApiBaseUrl } from "@/api/urls";
import { JSONApiReponse } from "@/api/utils/types";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { User } from "@/services/auth/users";
import { errorResponse } from "@/utils/errors";
import { ctwFetch } from "@/utils/request";

export const editUserPermissions = async (
  data: EditUserFormData,
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

export async function createUser(
  data: CreateUserFormData,
  getRequestContext: () => Promise<CTWRequestContext>
): Promise<JSONApiReponse<User>> {
  const requestContext = await getRequestContext();
  const baseUrl = new URL(`${getZusApiBaseUrl(requestContext.env)}/auth/users`);

  const rolesMap: { [key: string]: string } = {
    "Care Team User": "3d9d633d-245c-430b-866b-83928cd6581e",
    "Builder Admin": "abe9baeb-c171-494c-9e3b-6fef27ef4214",
  };

  const createPayload = {
    data: {
      type: "auth/users",
      attributes: {
        email: data.email,
        name: data.name,
        userType: data.userType,
        sendPasswordResetEmail: true,
      },
      relationships: {
        "auth/roles": {
          data: {
            type: "auth/roles",
            id: rolesMap[data.role],
          },
        },
        "auth/builders": {
          data: {
            type: "auth/builders",
            id: data.builderId,
          },
        },
        // "fhir/practitioner": {
        //   data: {
        //     type: "fhir/practitioner",
        //     id: "{{OptionalPractitionerID}}",
        //   },
        // },
      },
    },
  };

  try {
    const response = await fetch(baseUrl.href, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${requestContext.authToken}`,
      },
      body: JSON.stringify(createPayload),
    });

    return response.json();
  } catch (e) {
    throw errorResponse("Failed fetching patients", e);
  }
}

export type EditUserFormData = {
  id: string;
};

export type CreateUserFormData = {
  email: string;
  name: string;
  userType: string;
  role: string;
  builderId: string;
};

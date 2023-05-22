import { GraphQLClient } from "graphql-request";
import { getZusApiBaseUrl } from "@/api/urls";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { Env } from "@/components/core/providers/ctw-provider";
import { CTW_REQUEST_HEADER } from "@/utils/request";

export interface GraphqlPageInfo {
  hasNextPage: boolean;
}

export interface GraphqlConnectionNode<T> {
  node: T;
}

export const createGraphqlClient = (requestContext: CTWRequestContext) => {
  const endpoint = `${getZusApiBaseUrl(requestContext.env)}/fqs/query`;
  return new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${requestContext.authToken}`,
    },
  });
};

export function getFetchFromFqs(env: Env, accessToken: string, builderId?: string) {
  const baseUrl = `${getZusApiBaseUrl(env)}/fqs`;

  const customHeaders: HeadersInit = CTW_REQUEST_HEADER;
  if (builderId) {
    customHeaders["Zus-Account"] = builderId;
  }

  return (url: string, options: RequestInit) =>
    fetch(`${baseUrl}/${url}`, {
      ...options,
      headers: new Headers({
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      }),
    });
}

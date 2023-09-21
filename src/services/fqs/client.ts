import { GraphQLClient, Variables } from "graphql-request";
import { graphQLToFHIR } from "./graphql-to-fhir";
import { getZusServiceUrl } from "@/api/urls";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { Env } from "@/components/core/providers/types";
import { ResourceType, ResourceTypeString } from "@/fhir/types";
import { CTW_REQUEST_HEADER } from "@/utils/request";
import { Telemetry } from "@/utils/telemetry";

export interface GraphqlPageInfo {
  hasNextPage: boolean;
}

export interface GraphqlConnectionNode<T> {
  node: T;
}

export interface GenericConnection<T extends ResourceTypeString> {
  pageInfo: GraphqlPageInfo;
  edges: GraphqlConnectionNode<ResourceType<T>>[];
}

export const MAX_OBJECTS_PER_REQUEST = 200;

export const createGraphqlClient = (requestContext: CTWRequestContext) => {
  const endpoint = `${getZusServiceUrl(requestContext.env, "fqs")}/query`;
  return new GraphQLClient(endpoint, {
    errorPolicy: "all",
    headers: {
      ...CTW_REQUEST_HEADER,
      authorization: `Bearer ${requestContext.authToken}`,
    },
  });
};

export const fqsRequest = async <T>(client: GraphQLClient, query: string, variables: object) => {
  const updatedVariables = { ...variables };
  if (
    "first" in updatedVariables &&
    typeof updatedVariables.first === "number" &&
    updatedVariables.first > MAX_OBJECTS_PER_REQUEST
  ) {
    updatedVariables.first = MAX_OBJECTS_PER_REQUEST;
  }

  const { data, errors } = await client.rawRequest<T>(query, updatedVariables as Variables);
  const fhirData = graphQLToFHIR(data);
  if (errors) {
    if (data) {
      errors.forEach((e) => {
        Telemetry.logger.error("Error in FQS request", undefined, e);
      });
      return { data: fhirData };
    }
    throw errors;
  }
  return { data: fhirData };
};

export function getFetchFromFqs(env: Env, accessToken: string, builderId?: string) {
  const baseUrl = `${getZusServiceUrl(env, "fqs")}/`;

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

export function getResourceNodes<T extends ResourceTypeString>(
  response: object
): ResourceType<T>[] {
  const values = Object.values(response) as GenericConnection<T>[];

  return values.map((x) => x.edges.map((y) => y.node)).flat();
}

export function getHistoryResources<T extends ResourceTypeString>(
  response: object
): ResourceType<T>[] {
  const values = Object.values(response);

  return values.flat();
}

import { GraphQLClient } from "graphql-request";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";

export const createGraphClient = (requestContext: CTWRequestContext) => {
  const endpoint =
    requestContext.env === "production"
      ? `https://fqs.api.zusapi.com/query`
      : `https://fqs.${requestContext.env}.zusapi.com/query`;
  console.log("endpoint", endpoint);
  return new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${requestContext.authToken}`,
    },
  });
};

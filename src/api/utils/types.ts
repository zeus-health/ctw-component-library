export type JSONApiReponse<T> = {
  data: T[];
  links: { self: string; prev?: string; next?: string };
};

export type JSONApiEndpointTypes = "auth/users" | "patient-history/jobs";

export type JSONApiBase = {
  type: JSONApiEndpointTypes;
  id: string;
  attributes: Record<string, string>;
  relationships: Record<string, string>;
};

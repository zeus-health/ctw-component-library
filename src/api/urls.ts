import { Env } from "@/components/core/providers/types";

export const getZusApiBaseUrl = (env: Env) =>
  env === "production" ? `https://api.zusapi.com` : `https://api.${env}.zusapi.com`;

export const getZusProxyApiBaseUrl = (env: Env) =>
  env === "production"
    ? `https://ehr-hooks.zusapi.com/proxy`
    : `https://ehr-hooks.${env}.zusapi.com/proxy`;

export const getFormsConditionsUrl = (env: Env) =>
  `${getZusApiBaseUrl(env)}/forms-data/terminology/conditions`;

export const getFormsMedicationsUrl = (env: Env) =>
  `${getZusApiBaseUrl(env)}/forms-data/terminology/dosages`;

export const getMetricsBaseUrl = (env: string) => {
  if (window.location.hostname === "localhost") {
    // Locally we just want to send to 3000. This provides 2 outcomes:
    // - If CTW is running locally on 3000, we can test with to dev Datadog
    // - Else, the requests fail silently
    return "http://localhost:3000";
  }
  return ["prod", "production"].includes(env)
    ? `https://ctw.zusapi.com`
    : `https://ctw.${env}.zusapi.com`;
};

export const getLensBuilderId = (env: Env) => {
  switch (env) {
    case "dev":
      return "bc1c791a-581c-4117-8b17-f9c59f39caf8";
    case "phitest":
      return "186d5446-46ec-4beb-8699-9e42903a3dd2";
    case "production":
      return "5e0f86eb-bb0b-4543-8489-262fcbf661da";
    case "sandbox":
      return "d8ab3e86-7ff2-482d-bbed-b30df2dd7ec7";
    default:
      throw new Error("Unknown environment");
  }
};

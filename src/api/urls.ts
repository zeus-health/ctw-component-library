import { Env } from "..";

export const getZusApiBaseUrl = (env: Env) =>
  env === "production"
    ? `https://api.zusapi.com`
    : `https://api.${env}.zusapi.com`;

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

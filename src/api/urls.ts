import { Env } from "..";

export const getZusApiBaseUrl = (env: Env) =>
  env === "production"
    ? `https://api.zusapi.com`
    : `https://api.${env}.zusapi.com`;

export const getFormsConditionsUrl = (env: Env) =>
  `${getZusApiBaseUrl(env)}/forms-data/terminology/conditions`;

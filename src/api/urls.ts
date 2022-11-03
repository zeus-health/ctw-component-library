import { Env } from "..";

const getZusApiBaseUrl = (env: Env) =>
  env === "production"
    ? `https://api.zusapi.com`
    : `https://api.${env}.zusapi.com`;

export const getFormsConditionsUrl = (env: Env) =>
  `${getZusApiBaseUrl(env)}/forms-data/terminology/conditions`;

export const getFormsMedicationsUrl = (env: Env) =>
  `${getZusApiBaseUrl(env)}/forms-data/terminology/medications`;

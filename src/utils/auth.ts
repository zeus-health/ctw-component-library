import jwt_decode from "jwt-decode";

export const AUTH_BUILDER_ID = "https://zusapi.com/builder_id";
export const AUTH_BUILDER_NAME = "https://zusapi.com/builder_name";
export const AUTH_PRACTITIONER_ID = "https://zusapi.com/practitioner_id";
export const AUTH_IS_SUPER_ORG = "https://zusapi.com/is_super_org";
export const AUTH_PERMISSION_TOKEN = "https://zusapi.com/permissions_token";
export const AUTH_EMAIL = "https://zusapi.com/email";
export const AUTH_USER_ID = "https://zusapi.com/user_id";
export const AUTH_APP_CLIENT_ID = "https://zusapi.com/app_client_id";
export const AUTH_USER_TYPE = "https://zusapi.com/user_type";
export const AUTH_PATIENT_ID = "https://zusapi.com/patient_id";
export const AUTH_AUTHENTICATED_BY = "https://zusapi.com/authenticated_by";

type ZusJWT = {
  [AUTH_BUILDER_ID]: string;
  [AUTH_BUILDER_NAME]: string;
  [AUTH_PRACTITIONER_ID]: string;
  [AUTH_IS_SUPER_ORG]: string;
  [AUTH_PERMISSION_TOKEN]: string;
  [AUTH_EMAIL]: string;
  [AUTH_USER_ID]: string;
  [AUTH_APP_CLIENT_ID]: string;
  [AUTH_USER_TYPE]: string;
  [AUTH_PATIENT_ID]: string;
  [AUTH_AUTHENTICATED_BY]: string;
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
};

function getClaims(authToken: string): ZusJWT {
  try {
    return jwt_decode(authToken);
  } catch {
    return {} as ZusJWT;
  }
}

export function claimsBuilderId(authToken: string): string | undefined {
  return getClaims(authToken)[AUTH_BUILDER_ID];
}

export function claimsBuilderName(authToken: string): string | undefined {
  return getClaims(authToken)[AUTH_BUILDER_NAME];
}

export function claimsPractitionerId(authToken: string): string | undefined {
  return getClaims(authToken)[AUTH_PRACTITIONER_ID];
}

export function claimsAuthEmail(authToken: string): string | undefined {
  return getClaims(authToken)[AUTH_EMAIL];
}

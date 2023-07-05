import { getLensBuilderId } from "@/api/urls";

export const FAKE_BUILDER_ID = "b33";
export const FAKE_AUTH =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJodHRwczovL3p1c2FwaS5jb20vYnVpbGRlcl9pZCI6IjEiLCJodHRwczovL3p1c2FwaS5jb20vYnVpbGRlcl9uYW1lIjoiWnVzIEhlYWx0aCIsImh0dHBzOi8venVzYXBpLmNvbS9wcmFjdGl0aW9uZXJfaWQiOiIiLCJodHRwczovL3p1c2FwaS5jb20vaXNfc3VwZXJfb3JnIjoidHJ1ZSIsImh0dHBzOi8venVzYXBpLmNvbS9wZXJtaXNzaW9uc190b2tlbiI6IjIiLCJodHRwczovL3p1c2FwaS5jb20vZW1haWwiOiJ0ZXN0QHp1c2hlYWx0aC5jb20iLCJodHRwczovL3p1c2FwaS5jb20vdXNlcl9pZCI6IjMiLCJodHRwczovL3p1c2FwaS5jb20vYXBwX2NsaWVudF9pZCI6IiIsImh0dHBzOi8venVzYXBpLmNvbS91c2VyX3R5cGUiOiJ6dXMiLCJodHRwczovL3p1c2FwaS5jb20vcGF0aWVudF9pZCI6IiIsImh0dHBzOi8venVzYXBpLmNvbS9hdXRoZW50aWNhdGVkX2J5IjoiIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmRldi56dXNhcGkuY29tLyIsInN1YiI6Imdvb2dsZS1hcHBzfHRlc3RAenVzaGVhbHRoLmNvbSIsImF1ZCI6WyJodHRwczovL2FwaS5kZXYuenVzYXBpLmNvbSIsImh0dHBzOi8venVzLWRldi51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjg2Njg4NjUyLCJleHAiOjE2ODY2OTIyNTIsImF6cCI6IjJPQmdlbm1uVEdIQ3gxbnpqeEc5TVlvcm5CZVh5aldZIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBvZmZsaW5lX2FjY2VzcyJ9.BM1BeuFBwO9_YKyzyl_BfYlF03Kvu6J56HOc5o6DVIU";
export const FAKE_PATIENT_UPID = "p101";

export const FAKE_BUILDER_TAG = {
  system: "https://zusapi.com/accesscontrol/owner",
  code: `builder/${FAKE_BUILDER_ID}`,
  display: "Storybook Medical - Test Customer",
};

export const LENS_BUILDER_TAG = {
  system: "https://zusapi.com/accesscontrol/owner",
  code: `builder/${getLensBuilderId("dev")}`,
  display: "zus-health-lens",
};

export const FAKE_LENS_PATIENT_UPID_TAG = {
  system: "https://zusapi.com/lens/upid",
  code: FAKE_PATIENT_UPID,
};

export const FAKE_UNIVERSAL_ID_TAG = {
  system: "https://zusapi.com/fhir/identifier/universal-id",
  value: FAKE_PATIENT_UPID,
};

export const FAKE_UNIVERSAL_ID_EXTENSION = {
  url: "https://zusapi.com/fhir/identifier/universal-id",
  valueString: FAKE_PATIENT_UPID,
};

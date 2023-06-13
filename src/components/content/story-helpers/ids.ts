import { getLensBuilderId } from "@/api/urls";

export const FAKE_BUILDER_ID = "b33";
export const FAKE_AUTH =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJyYmV2bFNyMk1ab19BUTl2YlRnSiJ9.eyJodHRwczovL3p1c2FwaS5jb20vYnVpbGRlcl9pZCI6ImM3NjhkMTZmLTU3MWYtNGQyMS04OWRhLWFmMTk0NzhlZjU3MCIsImh0dHBzOi8venVzYXBpLmNvbS9idWlsZGVyX25hbWUiOiJadXMgSGVhbHRoIiwiaHR0cHM6Ly96dXNhcGkuY29tL3ByYWN0aXRpb25lcl9pZCI6IiIsImh0dHBzOi8venVzYXBpLmNvbS9pc19zdXBlcl9vcmciOiJ0cnVlIiwiaHR0cHM6Ly96dXNhcGkuY29tL3Blcm1pc3Npb25zX3Rva2VuIjoiNDg2MjFhODMtM2ZjMS00Y2E2LWEyYzMtMGVlMmUyODMxN2NjIiwiaHR0cHM6Ly96dXNhcGkuY29tL2VtYWlsIjoicHZhbGxlQHp1c2hlYWx0aC5jb20iLCJodHRwczovL3p1c2FwaS5jb20vdXNlcl9pZCI6IjhmYjZjMTRhLTQwNDAtNDUzNi04ZWRlLTYzMjlhNmM1OWJhYyIsImh0dHBzOi8venVzYXBpLmNvbS9hcHBfY2xpZW50X2lkIjoiIiwiaHR0cHM6Ly96dXNhcGkuY29tL3VzZXJfdHlwZSI6Inp1cyIsImh0dHBzOi8venVzYXBpLmNvbS9wYXRpZW50X2lkIjoiIiwiaHR0cHM6Ly96dXNhcGkuY29tL2F1dGhlbnRpY2F0ZWRfYnkiOiIiLCJpc3MiOiJodHRwczovL2F1dGguZGV2Lnp1c2FwaS5jb20vIiwic3ViIjoiZ29vZ2xlLWFwcHN8cHZhbGxlQHp1c2hlYWx0aC5jb20iLCJhdWQiOlsiaHR0cHM6Ly9hcGkuZGV2Lnp1c2FwaS5jb20iLCJodHRwczovL3p1cy1kZXYudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY4NjY4ODY1MiwiZXhwIjoxNjg2NjkyMjUyLCJhenAiOiIyT0JnZW5tblRHSEN4MW56anhHOU1Zb3JuQmVYeWpXWSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgb2ZmbGluZV9hY2Nlc3MifQ.oM3OKb4EqnM4aozFBWmpwij42POhTSfE-l0DuYCF8uOy5NksgGnOXAD4xmYsxYc6uH6dPiyRGzS_x9xnhFLlGtzm4snfRBjTESq336NsZ8xQjyTZQeGKAhtDKSz92mVH7SI8glFiU0qEWZ76WyXw0nGPRt-Y6XLSKbDPsVFuWus5BeYQS2Ko5E5wgg-bGG1yMK43Vq3uNvf7r1nncXGnnIV88Mkp_R8OM8_ZQ7oQRGSToRKSuk_-mdKtMWysVuLzdfzf_KIh09dU5bCsLP5ku9UaVauTm5ja78oI-f1mg1ZK5BJbL794Wlpuy4kgQCSpHVUT5BPu66wJWXLUvbt_JA";
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

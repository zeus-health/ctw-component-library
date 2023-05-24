import { getLensBuilderId } from "@/api/urls";

export const FAKE_BUILDER_ID = "b33";
export const FAKE_AUTH = "ey.12345";
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

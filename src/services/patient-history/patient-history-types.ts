import { JSONApiBase } from "@/api/utils/types";

export type PatientRefreshHistoryMessageStatus =
  | "initialize"
  | "in_progress"
  | "done"
  | "error"
  | "done_with_errors";

export type PatientHistoryServiceMessage = {
  service: string;
  status: PatientRefreshHistoryMessageStatus;
};

export type PatientHistoryJobResponseJobData = {
  attributes: {
    createdAt: string;
    requestConsent: boolean;
    practitioner: {
      npi: string;
      name: string;
      role: string;
    };
    providers: PatientHistoryServiceMessage[];
    targetDate?: string;
  };
  relationships: {
    patient: {
      data: { type: "fhir/Patient"; id: string };
    };
    practitioner?: {
      data: { type: "fhir/Practitioner"; id: string };
    };
  };
} & JSONApiBase;

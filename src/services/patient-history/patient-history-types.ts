export type PatientRefreshHistoryMessage = {
  status: PatientRefreshHistoryMessageStatus;
  uuid: string;
  initialData: {
    patientId: string;
  };
  _errors: string[];
  _createdAt: string;
  _updatedAt: string;
  _lastUpdated: string;
  _messages: PatientHistoryServiceMessage[];
};

export type PatientHistoryResponse = {
  data: PatientRefreshHistoryMessage[];
};

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

export type PatientHistoryCreateJobBody = {
  data: {
    type: "patient-history/jobs";
    attributes: {
      requestConsent?: boolean;
      practitioner?: {
        npi: string;
        name: string;
        role: string;
      };
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
  };
};

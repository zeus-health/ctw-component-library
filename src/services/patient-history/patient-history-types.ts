export type PatientHistoryStatus =
  | "initialize"
  | "in_progress"
  | "done"
  | "error";

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

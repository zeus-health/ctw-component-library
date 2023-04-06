export type PatientHistoryStatus =
  | "initialize"
  | "in_progress"
  | "done"
  | "error";

export type PatientRefreshHistoryMessage = {
  status: PatientHistoryStatus;
  messageUuid: string;
  initialData: {
    patientId: string;
  };
  _errors: string[];
  _createdAt: string;
  _lastUpdated: string;
  _messages: { service: string; status: PatientHistoryStatus }[];
};

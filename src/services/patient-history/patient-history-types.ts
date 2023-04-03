export type PatientRefreshHistoryMessage = {
  status: "initialize" | "in_progress" | "done" | "error";
  messageUuid: string;
  initialData: {
    patientId: string;
  };
  _errors: string[];
  _createdAt: string;
  _lastUpdated: string;
};

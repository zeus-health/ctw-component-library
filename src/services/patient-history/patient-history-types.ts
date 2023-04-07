export type PatientRefreshHistoryMessage = {
  status: "initialize" | "in_progress" | "done" | "error" | "done_with_errors";
  messageUuid: string;
  initialData: {
    patientId: string;
  };
  _errors: string[];
  _createdAt: string;
  _updatedAt: string;
};

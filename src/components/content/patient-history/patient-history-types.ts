export type PatientRefreshHistoryMessage = {
  status: "initialize" | "in_progress" | "done" | "error";
  messageUuid: string;
  initialData: {
    patientId: string;
  };
  _createdAt: string;
  _updatedAt: string;
};

// All of the possible resourceType strings.
export type ResourceTypeString = fhir4.FhirResource["resourceType"];

// Usage ResourceType<"MedicationStatement"> to return the fhir4.MedicationStatement type.
// This is useful in combination with ResourceTypeString, allowing us to go
// from the resourceType string to the actual fhir4 resource type.
export type ResourceType<T extends ResourceTypeString> = Extract<
  fhir4.FhirResource,
  { resourceType: T }
>;

export type ResourceMap = { [key: string]: fhir4.Resource };

export type Tag = { system: string; code: string };

export type RawPatientRefreshHistoryMessage = {
  status: "initialize" | "in_progress" | "done" | "error";
  messageUuid: string;
  initialData: {
    patientId: string;
  };
  _createdAt: string;
  _updatedAt: string;
};

export type PatientRefreshHistoryMessage = {
  status: "initialize" | "in_progress" | "done" | "error";
  messageUuid: string;
  initialData: {
    patientId: string;
  };
  createdAt: string;
  updatedAt: string;
};

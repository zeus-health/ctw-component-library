// All of the possible resourceType strings.
export type ResourceTypeString = fhir4.FhirResource["resourceType"];

// Usage ResourceType<"MedicationStatement"> to return the fhir4.MedicationStatement type.
// This is useful in combination with ResourceTypeString, allowing us to go
// from the resourceType string to the actual fhir4 resource type.
export type ResourceType<T extends ResourceTypeString> = Extract<
  fhir4.FhirResource,
  { resourceType: T }
>;

export type ResourceMap = { [key: string]: fhir4.Resource | undefined };
export type ResourceArrayMap = { [key: string]: fhir4.Resource[] | undefined };

export type Tag = { system: string; code: string };

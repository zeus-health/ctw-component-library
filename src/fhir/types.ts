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
export type ResourceArrayMap = Map<string, fhir4.Resource[]>;

export type Tag = { system: string; code: string };

export function isFHIRResource(resource: unknown): resource is fhir4.DomainResource {
  return (
    typeof resource === "object" &&
    resource !== null &&
    "resourceType" in resource &&
    resource.resourceType !== "Binary"
  );
}

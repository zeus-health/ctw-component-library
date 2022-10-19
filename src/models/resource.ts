export interface ResourceModel {
  id: string | undefined;
  resourceType: string;
  resource: fhir4.Resource;
}

import { findReference } from "@/fhir/resource-helper";
import { find } from "lodash";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "../fhir/system-urls";
import type { ResourceMap } from "../fhir/types";
import { OrganizationModel } from "./organization";

export class PatientModel {
  private resource: fhir4.Patient;

  private includedResources?: ResourceMap;

  constructor(patient: fhir4.Patient, includedResources?: ResourceMap) {
    this.resource = patient;
    this.includedResources = includedResources;
  }

  get id(): string {
    return this.resource.id || "";
  }

  get organization(): OrganizationModel | undefined {
    const reference = findReference(
      "Organization",
      this.resource.contained,
      this.includedResources,
      this.resource.managingOrganization?.reference
    );

    if (reference) {
      return new OrganizationModel(reference, this.includedResources);
    }

    return undefined;
  }

  get UPID(): string {
    const upid = find(this.resource.identifier, {
      system: SYSTEM_ZUS_UNIVERSAL_ID,
    })?.value;
    if (!upid) {
      throw Error(`"UPID not found on patient, ${this.id}`);
    }
    return upid;
  }
}

import { findReference } from "@/fhir/resource-helper";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";
import { find, remove } from "lodash";
import { FHIRModel } from "./fhir-model";
import { OrganizationModel } from "./organization";

export const MaritalStatuses = [
  { text: "Annulled", code: "A" },
  { text: "Divorced", code: "D" },
  { text: "Interlocutory", code: "I" },
  { text: "Legally Separated", code: "L" },
  { text: "Married", code: "M" },
  { text: "Polygamous", code: "P" },
  { text: "Never Married", code: "S" },
  { text: "Domestic Partner", code: "T" },
  { text: "unmarried", code: "U" },
  { text: "Widowed", code: "W" },
] as const;

export class PatientModel extends FHIRModel<fhir4.Patient> {
  get gender(): string | undefined {
    return this.resource.gender;
  }

  get maritalStatus(): string | undefined {
    // The code is the source of truth, look up the code
    // in our list of statuses and return the text.
    const code = this.resource.maritalStatus?.coding?.[0]?.code;
    const status = MaritalStatuses.find((s) => s.code === code);
    return status?.text;
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

  get UPID(): string | undefined {
    return find(this.resource.identifier, { system: SYSTEM_ZUS_UNIVERSAL_ID })
      ?.value;
  }

  /*
    ADDRESS STUFF
  */

  private get bestHomeAddress(): fhir4.Address | undefined {
    return (
      find(this.resource.address, { use: "home" }) ||
      find(this.resource.address, (address) => !address.use) // use is undefined
    );
  }

  /*
    TELECOM STUFF
  */
  private setTelecom(
    system: fhir4.ContactPoint["system"],
    use?: fhir4.ContactPoint["use"],
    value?: string
  ) {
    const predicate: fhir4.ContactPoint = { system };
    if (use) {
      predicate.use = use;
    }

    // Make sure we have a telecom array.
    if (!this.resource.telecom) {
      this.resource.telecom = [];
    }

    if (value) {
      const telecom = find(this.resource.telecom, predicate);
      if (telecom) {
        telecom.value = value;
      } else {
        this.resource.telecom.push({
          system,
          use,
          value,
        });
      }
    } else {
      // Remove all telecoms that match!
      remove(this.resource.telecom, predicate);
    }
  }

  get email(): string | undefined {
    return find(this.resource.telecom, { system: "email" })?.value;
  }

  /*
    NAME STUFF
  */
  // Returns the best name to use for this patient.
  // Priority is "official", then "usual", then first name provided.
  private get bestName(): fhir4.HumanName {
    // If patient has ZERO names, then add one!
    if (!this.resource.name || this.resource.name.length === 0) {
      this.resource.name = [{ use: "official" }];
    }

    return (
      find(this.resource.name, { use: "official" }) ||
      find(this.resource.name, { use: "usual" }) ||
      this.resource.name[0] || // We'll always have at least one!
      {} // Make TypeScript happy.
    );
  }

  get additionalNames(): string | undefined {
    if (this.bestName.given && this.bestName.given.length > 1) {
      const [, ...rest] = this.bestName.given;
      return rest.join(" ");
    }
    return undefined;
  }

  // Returns "First Last" which is similar to a reference display.
  get display(): string {
    return [this.firstName, this.lastName].filter((name) => name).join(" ");
  }

  get firstName(): string {
    return this.bestName.given?.[0] || "";
  }

  // Returns "Last, First" or just "First" or just "Last" or "" when
  // neither are available.
  get fullName(): string {
    return [this.lastName, this.firstName].filter((name) => name).join(", ");
  }

  get lastName(): string | undefined {
    return this.bestName.family;
  }

  get nickname(): string | undefined {
    const name = find(this.resource.name, { use: "nickname" });
    return name?.given?.join(" ");
  }

  get prefix(): string | undefined {
    return this.bestName.prefix?.join(" ");
  }

  get suffix(): string | undefined {
    return this.bestName.suffix?.join(" ");
  }
}

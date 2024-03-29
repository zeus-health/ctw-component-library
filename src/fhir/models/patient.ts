import { differenceInYears, parseISO } from "date-fns";
import fhir4 from "fhir/r4";
import { FHIRModel } from "./fhir-model";
import { OrganizationModel } from "./organization";
import { formatDateISOToLocal, formatPhoneNumber } from "../formatters";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "../system-urls";
import { findReference } from "@/fhir/resource-helper";
import { cloneDeep, find } from "@/utils/nodash";

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
  kind = "Patient" as const;

  get active(): boolean | undefined {
    return this.resource.active;
  }

  get contact(): fhir4.PatientContact[] | undefined {
    return this.resource.contact;
  }

  get dob(): string | undefined {
    return formatDateISOToLocal(this.resource.birthDate);
  }

  get age(): number | undefined {
    if (!this.resource.birthDate) return undefined;

    const date = parseISO(this.resource.birthDate);
    return differenceInYears(new Date(), date);
  }

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
      this.resource.managingOrganization
    );

    if (reference) {
      return new OrganizationModel(reference, this.includedResources);
    }

    return undefined;
  }

  get organizationDisplayName(): string | undefined {
    if (this.organization) {
      return this.organization.name;
    }
    return this.thirdPartyDataSourceName;
  }

  get use(): fhir4.HumanName["use"] | undefined {
    return this.bestName.use;
  }

  get officialOrUsualIdentifier(): string {
    return (
      find(this.resource.identifier, { use: "official" })?.value ||
      find(this.resource.identifier, { use: "usual" })?.value ||
      ""
    );
  }

  get UPID(): string | undefined {
    const upid = find(this.resource.identifier, {
      system: SYSTEM_ZUS_UNIVERSAL_ID,
    })?.value;

    return upid;
  }

  getPhoneNumber(use?: fhir4.ContactPoint["use"]): string | undefined {
    const predicate: fhir4.ContactPoint = { system: "phone" };
    if (use) {
      predicate.use = use;
    }
    const telecom = find(this.resource.telecom, predicate);
    return formatPhoneNumber(telecom?.value);
  }

  // Gets first "phone" telecom.
  get phoneNumber(): string | undefined {
    return this.getPhoneNumber();
  }

  get email(): string | undefined {
    return find(this.resource.telecom, { system: "email" })?.value;
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

  // Returns first home address or first address without "use" set.
  // This way we return a home address if there is one, or another address
  // but making sure not to return a work address here.
  get homeAddress(): fhir4.Address | undefined {
    // Clone the address so that consumers cannot modify our resource.
    return cloneDeep(this.bestHomeAddress);
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

  get isTestPatient(): boolean {
    // no security tags means not a test patient
    if (!this.resource.meta || !this.resource.meta.security) {
      return false;
    }

    return (
      this.resource.meta.security.filter(
        (secTag) =>
          secTag.system === "http://terminology.hl7.org/CodeSystem/v3-ActReason" &&
          secTag.code === "HTEST"
      ).length > 0
    );
  }
}

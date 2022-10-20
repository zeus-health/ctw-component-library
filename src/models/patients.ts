import { differenceInYears, parseISO } from "date-fns";
import { cloneDeep, find, remove } from "lodash";
import { errorResponse } from "@/utils/errors";
import { getFhirClient, omitEmptyArrays } from "@/fhir/client";
import { codeableConceptPredicate } from "@/fhir/codeable-concept";
import {
  dateToISO,
  formatDateISOToLocal,
  formatPhoneNumber,
} from "@/fhir/formatters";
import { findReference } from "@/fhir/resource-helper";
import {
  SYSTEM_MARITAL_STATUS,
  SYSTEM_RELATIONSHIP,
  SYSTEM_ZUS_UNIVERSAL_ID,
} from "@/fhir/system-urls";
import type { ResourceMap } from "@/fhir/types";
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

export const MaritalStatusOptions = MaritalStatuses.map(
  (status) => status.text
);

export class PatientModel {
  readonly resource: fhir4.Patient;

  readonly includedResources?: ResourceMap;

  constructor(patient: fhir4.Patient, includedResources?: ResourceMap) {
    this.resource = patient;
    this.includedResources = includedResources;
  }

  get age(): number | undefined {
    if (!this.resource.birthDate) return undefined;

    const date = parseISO(this.resource.birthDate);
    return differenceInYears(new Date(), date);
  }

  get deceased(): string {
    if (this.resource.deceasedBoolean) {
      return "Yes";
    }

    if (this.resource.deceasedDateTime) {
      return formatDateISOToLocal(this.resource.deceasedDateTime) || "";
    }

    return "No";
  }

  get dob(): string | undefined {
    return formatDateISOToLocal(this.resource.birthDate);
  }

  set dob(dob: Date | string | undefined) {
    if (dob instanceof Date) {
      this.resource.birthDate = dateToISO(dob);
    } else {
      this.resource.birthDate = dob;
    }
  }

  get emergencyContact(): fhir4.PatientContact {
    const contact = find(this.resource.contact || [], {
      relationship: codeableConceptPredicate("C"),
    });
    return cloneDeep(contact) ?? {};
  }

  set emergencyContact(contact: fhir4.PatientContact | undefined) {
    remove(this.resource.contact || [], {
      relationship: codeableConceptPredicate("C"),
    });

    if (contact) {
      // Make sure we have an address array.
      if (!this.resource.contact) {
        this.resource.contact = [];
      }

      // Setup our new emergency contact with the correct relationship.
      const newContact = contact;
      if (!newContact.relationship) {
        newContact.relationship = [];
      }

      // Add Emergency Contact relationship if there isn't one already.
      if (!find(newContact.relationship, codeableConceptPredicate("C"))) {
        newContact.relationship.push({
          text: "Emergency Contact",
          coding: [
            {
              code: "C",
              display: "Emergency Contact",
              system: SYSTEM_RELATIONSHIP,
            },
          ],
        });
      }

      // Add it to our contact array!
      this.resource.contact.push(newContact);
    }
  }

  get gender(): string | undefined {
    return this.resource.gender;
  }

  get id(): string {
    return this.resource.id || "";
  }

  get maritalStatus(): string | undefined {
    // The code is the source of truth, look up the code
    // in our list of statuses and return the text.
    const code = this.resource.maritalStatus?.coding?.[0]?.code;
    const status = MaritalStatuses.find((s) => s.code === code);
    return status?.text;
  }

  set maritalStatus(statusText: string | undefined) {
    // Look up our code via the text.
    const code = MaritalStatuses.find((s) => s.text === statusText)?.code;
    if (!code) {
      this.resource.maritalStatus = undefined;
    } else {
      this.resource.maritalStatus = {
        text: statusText,
        coding: [
          {
            code,
            display: statusText,
            system: SYSTEM_MARITAL_STATUS,
          },
        ],
      };
    }
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

  // Returns first home address or first address without "use" set.
  // This way we return a home address if there is one, or another address
  // but making sure not to return a work address here.
  get homeAddress(): fhir4.Address | undefined {
    // Clone the address so that consumers cannot modify our resource.
    return cloneDeep(this.bestHomeAddress);
  }

  set homeAddress(address: fhir4.Address | undefined) {
    // Make sure we have an address array.
    if (!this.resource.address) {
      this.resource.address = [];
    }

    if (!address) {
      // Remove all of our possible addresses.
      remove(this.resource.address, { use: "home" });
      remove(this.resource.address, (addy) => !addy.use); // use is undefined
    } else {
      // Make sure all added addresses are set to home.
      // This ensures bestHomeAddress will return this new one!
      const newAddress: fhir4.Address = { use: "home", ...address };
      const existingAddress = this.bestHomeAddress;
      if (existingAddress) {
        // Take special care to replace the address. This way
        // we preserve the order of addresses (not sure how important this is).
        const index = this.resource.address.indexOf(existingAddress);
        this.resource.address.splice(index, 1, newAddress);
      } else {
        // Adding a completely new address, so set its use to home.
        this.resource.address.push(newAddress);
      }
    }
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

  set email(email: string | undefined) {
    this.setTelecom("email", undefined, email);
  }

  getPhoneNumber(use?: fhir4.ContactPoint["use"]): string | undefined {
    const predicate: fhir4.ContactPoint = { system: "phone" };
    if (use) {
      predicate.use = use;
    }
    const telecom = find(this.resource.telecom, predicate);
    return formatPhoneNumber(telecom?.value);
  }

  setPhoneNumber(use?: fhir4.ContactPoint["use"], phoneNumber?: string) {
    this.setTelecom("phone", use, phoneNumber);
  }

  // Gets first "phone" telecom.
  get phoneNumber(): string | undefined {
    return this.getPhoneNumber();
  }

  // Sets first "phone" telecom.
  set phoneNumber(phoneNumber: string | undefined) {
    this.setTelecom("phone", undefined, phoneNumber);
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

  set additionalNames(additionalNames: string | undefined) {
    // First, remove all but the first given name.
    this.bestName.given?.splice(1);
    if (additionalNames) {
      // Set our given names to start with our firstName, followed by
      // all of the additional names, split by spaces.
      this.bestName.given = [this.firstName, ...additionalNames.split(" ")];
    }
  }

  // Returns "First Last" which is similar to a reference display.
  get display(): string {
    return [this.firstName, this.lastName].filter((name) => name).join(" ");
  }

  get firstName(): string {
    return this.bestName.given?.[0] || "";
  }

  set firstName(firstName: string) {
    if (this.bestName.given && this.bestName.given.length > 0) {
      this.bestName.given[0] = firstName;
    } else {
      this.bestName.given = [firstName];
    }
  }

  // Returns "Last, First" or just "First" or just "Last" or "" when
  // neither are available.
  get fullName(): string {
    return [this.lastName, this.firstName].filter((name) => name).join(", ");
  }

  get lastName(): string | undefined {
    return this.bestName.family;
  }

  set lastName(lastName: string | undefined) {
    this.bestName.family = lastName;
  }

  get nickname(): string | undefined {
    const name = find(this.resource.name, { use: "nickname" });
    return name?.given?.join(" ");
  }

  set nickname(nickname: string | undefined) {
    // Make sure we have a name array.
    if (!this.resource.name) {
      this.resource.name = [];
    }

    if (!nickname) {
      // Remove any existing nicknames.
      remove(this.resource.name, { use: "nickname" });
    } else {
      const existingNickname = find(this.resource.name, { use: "nickname" });
      if (existingNickname) {
        // Nickname already exists, so update the given name.
        existingNickname.given = nickname.split(" ");
      } else {
        // Nickname does not yet exist, create it.
        this.resource.name.push({
          use: "nickname",
          given: nickname.split(" "),
        });
      }
    }
  }

  get prefix(): string | undefined {
    return this.bestName.prefix?.join(" ");
  }

  set prefix(prefix: string | undefined) {
    this.bestName.prefix = prefix ? prefix.split(" ") : undefined;
  }

  get suffix(): string | undefined {
    return this.bestName.suffix?.join(" ");
  }

  set suffix(suffix: string | undefined) {
    this.bestName.suffix = suffix ? suffix.split(" ") : undefined;
  }
}

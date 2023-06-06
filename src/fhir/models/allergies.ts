import { FHIRModel } from "./fhir-model";
import { formatDateISOToLocal } from "../formatters";
import { findReference } from "../resource-helper";
import { SYSTEM_NDC, SYSTEM_RXNORM, SYSTEM_SNOMED } from "../system-urls";
import { codeableConceptLabel, CodePreference, findCoding } from "@/fhir/codeable-concept";
import { displayOnset } from "@/fhir/display-onset";
import { compact, uniqWith } from "@/utils/nodash";

export class AllergyModel extends FHIRModel<fhir4.AllergyIntolerance> {
  kind = "Allergy" as const;

  get categories(): string | undefined {
    return this.resource.category?.join(", ");
  }

  get resourceTypeTitle(): string {
    return this.resource.resourceType.slice(0, 7);
  }

  get clinicalStatus(): string {
    return codeableConceptLabel(this.resource.clinicalStatus);
  }

  get display(): string | undefined {
    return codeableConceptLabel(this.resource.code);
  }

  get lowercaseDisplay(): string | undefined {
    return this.display ? this.display.toLowerCase() : this.display;
  }

  get manifestations(): string {
    const manifestations: string[] = [];

    this.resource.reaction?.forEach((reaction) =>
      reaction.manifestation.forEach((manifestation) =>
        manifestations.push(codeableConceptLabel(manifestation))
      )
    );

    return manifestations.join(", ");
  }

  get managingOrganization(): string | undefined {
    const organizationDisplay = findReference(
      "Patient",
      this.resource.contained,
      this.includedResources,
      this.resource.patient.reference
    );

    const organizationName = findReference(
      "Organization",
      this.resource.contained,
      this.includedResources,
      organizationDisplay?.managingOrganization?.reference
    )?.name;

    return organizationDisplay?.managingOrganization?.display || organizationName;
  }

  get managingOrganizationFQS(): string | undefined {
    // @ts-ignore //We need this as we have a mutated resource that deviates from the FHIR spec.
    return this.resource.patient.resource.managingOrganization.resource.name;
  }

  get note(): string | undefined {
    let concatenatedString;
    if (this.resource.note) {
      concatenatedString = this.resource.note.map((note) => codeableConceptLabel(note)).join(", ");
    }

    return concatenatedString;
  }

  get severity(): string | undefined {
    return this.resource.reaction?.[0].severity;
  }

  get knownCodings(): fhir4.Coding[] {
    const codings = compact(
      ALLERGY_CODE_PREFERENCE_ORDER.map((code) => findCoding(code.system, this.resource.code))
    );

    const dedupedBySystemCoding = uniqWith(codings, (prev, next) => prev.system === next.system);
    return dedupedBySystemCoding;
  }

  get onset(): string | undefined {
    return displayOnset(this.resource);
  }

  get recordedDate(): string | undefined {
    return formatDateISOToLocal(this.resource.recordedDate);
  }

  get type(): string {
    return this.resource.type ?? "";
  }
}

const ALLERGY_CODE_PREFERENCE_ORDER: CodePreference[] = [
  { system: SYSTEM_RXNORM },
  { system: SYSTEM_NDC },
  { system: SYSTEM_SNOMED },
];

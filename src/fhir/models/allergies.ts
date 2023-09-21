import { FHIRModel } from "./fhir-model";
import { PatientModel } from "./patient";
import { formatDateISOToLocal } from "../formatters";
import { findReference } from "../resource-helper";
import { SYSTEM_NDC, SYSTEM_RXNORM, SYSTEM_SNOMED } from "../system-urls";
import { codeableConceptLabel, CodePreference, findCoding } from "@/fhir/codeable-concept";
import { displayOnset } from "@/fhir/display-onset";
import { capitalize, compact, uniqWith } from "@/utils/nodash";

export class AllergyModel extends FHIRModel<fhir4.AllergyIntolerance> {
  kind = "Allergy" as const;

  get categories(): string | undefined {
    return this.resource.category?.join(", ");
  }

  get codeText(): string | undefined {
    return this.resource.code?.text;
  }

  get resourceTypeTitle(): string {
    return this.resource.resourceType.slice(0, 7);
  }

  get clinicalStatus(): string {
    return codeableConceptLabel(this.resource.clinicalStatus);
  }

  get display(): string | undefined {
    return capitalize(codeableConceptLabel(this.resource.code));
  }

  get lowercaseDisplay(): string {
    return this.display?.toLocaleLowerCase() || "";
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

  get patientOrganizationName(): string | undefined {
    const reference = findReference(
      "Patient",
      this.resource.contained,
      this.includedResources,
      this.resource.patient
    );

    if (reference) {
      return new PatientModel(reference, this.includedResources).organizationDisplayName;
    }

    return undefined;
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

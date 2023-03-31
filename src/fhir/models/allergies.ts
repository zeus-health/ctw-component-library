import { codeableConceptLabel, findCoding } from "@/fhir/codeable-concept";
import { displayOnset } from "@/fhir/display-onset";
import { compact, uniqWith } from "lodash";
import { ALLERGY_CODE_PREFERENCE_ORDER } from "../allergies";
import { FHIRModel } from "./fhir-model";

export class AllergyModel extends FHIRModel<fhir4.AllergyIntolerance> {
  kind = "Allergy" as const;

  get categories(): string | undefined {
    return this.resource.category?.join(", ");
  }

  get clinicalStatus(): string {
    return codeableConceptLabel(this.resource.clinicalStatus);
  }

  get display(): string | undefined {
    return codeableConceptLabel(this.resource.code);
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

  get knownCodings(): fhir4.Coding[] {
    const codings = compact(
      ALLERGY_CODE_PREFERENCE_ORDER.map((code) => {
        return findCoding(code.system, this.resource.code);
      })
    );

    // The order of the array matters here because that is how it determines which record to keep when dupes are found.
    const dedupedBySystemCoding = uniqWith(
      codings,
      (prev, next) => prev.system === next.system
    );
    return dedupedBySystemCoding;
  }

  get onset(): string | undefined {
    return displayOnset(this.resource);
  }

  get recordedDate(): string | undefined {
    return this.resource.recordedDate;
  }

  get type(): string {
    return this.resource.type ?? "";
  }
}

import { codeableConceptLabel } from "@/fhir/codeable-concept";
import { displayOnset } from "@/fhir/display-onset";

export class AllergyModel {
  resource: fhir4.AllergyIntolerance;

  constructor(allergy: fhir4.AllergyIntolerance) {
    this.resource = allergy;
  }

  get id(): string {
    return this.resource.id ?? "";
  }

  get type(): string {
    return this.resource.type ?? "";
  }

  get clinicalStatus(): string {
    return codeableConceptLabel(this.resource.clinicalStatus);
  }

  get display(): string | undefined {
    return codeableConceptLabel(this.resource.code);
  }

  get categories(): string | undefined {
    return this.resource.category?.join(", ");
  }

  get onset(): string | undefined {
    return displayOnset(this.resource);
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
}

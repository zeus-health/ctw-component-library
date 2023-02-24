import { FHIRModel } from "./fhir-model";
import { codeableConceptLabel } from "@/fhir/codeable-concept";
import { displayOnset } from "@/fhir/display-onset";

export class AllergyModel extends FHIRModel<fhir4.AllergyIntolerance> {
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

  get onset(): string | undefined {
    return displayOnset(this.resource);
  }

  get type(): string {
    return this.resource.type ?? "";
  }
}

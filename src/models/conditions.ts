import { getFhirClient, omitEmptyArrays } from "@/fhir/client";
import { codeableConceptLabel, findCoding } from "../fhir/codeable-concept";
import { formatDateISOToLocal } from "../fhir/formatters";
import { SYSTEM_ICD10, SYSTEM_SNOMED } from "../fhir/system-urls";

export class ConditionModel {
  private resource: fhir4.Condition;

  constructor(condition: fhir4.Condition) {
    this.resource = condition;
  }

  async save(accessToken: string) {
    const fhirClient = await getFhirClient(accessToken);

    try {
      if (this.id) {
        return await fhirClient.update({
          resourceType: "Condition",
          id: this.id,
          body: omitEmptyArrays(this.resource) as fhir4.Condition,
        });
      }
      return await fhirClient.create({
        resourceType: "Condition",
        body: omitEmptyArrays(this.resource) as fhir4.Condition,
      });
    } catch (err) {
      throw Error("Failed saving condition.");
    }
  }

  get abatement(): string | undefined {
    if (this.resource.abatementAge) {
      return this.resource.abatementAge.value?.toString();
    }

    if (this.resource.abatementDateTime) {
      return formatDateISOToLocal(this.resource.abatementDateTime);
    }

    if (this.resource.abatementPeriod) {
      return formatDateISOToLocal(this.resource.abatementPeriod.start);
    }

    if (this.resource.abatementRange) {
      return formatDateISOToLocal(
        this.resource.abatementRange.low?.value?.toString()
      );
    }

    return this.resource.abatementString;
  }

  get asserter(): string | undefined {
    return this.resource.asserter?.display;
  }

  get bodySites(): string[] {
    return (
      this.resource.bodySite?.map((bodySite) =>
        codeableConceptLabel(bodySite)
      ) || []
    );
  }

  get categories(): string[] {
    return (
      this.resource.category?.map((category) =>
        codeableConceptLabel(category)
      ) || []
    );
  }

  get clinicalStatus(): string {
    return codeableConceptLabel(this.resource.clinicalStatus);
  }

  get display(): string | undefined {
    return codeableConceptLabel(this.resource.code);
  }

  get encounter(): string | undefined {
    return this.resource.encounter?.display;
  }

  get evidences(): string[] {
    return (
      this.resource.evidence?.map((evidence) =>
        codeableConceptLabel(evidence.code?.[0])
      ) || []
    );
  }

  get icd10(): string | undefined {
    return findCoding(SYSTEM_ICD10, this.resource.code)?.code;
  }

  get id(): string {
    return this.resource.id || "";
  }

  get notes(): string[] {
    return this.resource.note?.map((note) => note.text) || [];
  }

  get onset(): string | undefined {
    if (this.resource.onsetAge) {
      return this.resource.onsetAge.value?.toString();
    }

    if (this.resource.onsetDateTime) {
      return formatDateISOToLocal(this.resource.onsetDateTime);
    }

    if (this.resource.onsetPeriod) {
      return formatDateISOToLocal(this.resource.onsetPeriod.start);
    }

    if (this.resource.onsetRange) {
      return formatDateISOToLocal(
        this.resource.onsetRange.low?.value?.toString()
      );
    }

    return this.resource.onsetString;
  }

  get recordedDate(): string | undefined {
    return formatDateISOToLocal(this.resource.recordedDate);
  }

  get recorded(): string | undefined {
    return formatDateISOToLocal(this.resource.recordedDate);
  }

  get recorder(): string | undefined {
    return this.resource.recorder?.display;
  }

  get severity(): string {
    return codeableConceptLabel(this.resource.severity);
  }

  get stages(): string[] {
    return (
      this.resource.stage?.map((stage) => {
        const summary = codeableConceptLabel(stage.summary);
        const type = codeableConceptLabel(stage.type);
        return `Summary: ${summary}, Type: ${type}`;
      }) || []
    );
  }

  get snomedCode(): string | undefined {
    return findCoding(SYSTEM_SNOMED, this.resource.code)?.code;
  }

  get verificationStatus(): string {
    return codeableConceptLabel(this.resource.verificationStatus);
  }
}

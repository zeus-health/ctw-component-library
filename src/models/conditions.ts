import { codeableConceptLabel, findCoding } from "../fhir/codeable-concept";
import { formatDateISOToLocal } from "../fhir/formatters";
import {
  SYSTEM_CCS,
  SYSTEM_ICD10,
  SYSTEM_ICD10_CM,
  SYSTEM_ICD9,
  SYSTEM_ICD9_CM,
  SYSTEM_SNOMED,
} from "../fhir/system-urls";

export class ConditionModel {
  public resource: fhir4.Condition;

  constructor(condition: fhir4.Condition) {
    this.resource = condition;
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

  get icd9Code(): string | undefined {
    return findCoding(SYSTEM_ICD9, this.resource.code)?.code;
  }

  get icd9CMCode(): string | undefined {
    return findCoding(SYSTEM_ICD9_CM, this.resource.code)?.code;
  }

  get icd10CMCode(): string | undefined {
    return findCoding(SYSTEM_ICD10_CM, this.resource.code)?.code;
  }

  get icd10Coding(): fhir4.Coding | undefined {
    return findCoding(SYSTEM_ICD10, this.resource.code);
  }

  get icd10Code(): string | undefined {
    console.log(
      "findCoding(SYSTEM_ICD10, this.resource.code)",
      findCoding(SYSTEM_ICD10, this.resource.code)
    );
    return findCoding(SYSTEM_ICD10, this.resource.code)?.code;
  }

  get icd10System(): string | undefined {
    return findCoding(SYSTEM_ICD10, this.resource.code)?.system;
  }

  get icd10Display(): string | undefined {
    return findCoding(SYSTEM_ICD10, this.resource.code)?.display;
  }

  get ccsGrouping(): string | undefined {
    return findCoding(SYSTEM_CCS, this.resource.code)?.display;
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

  get snomedCode(): string | undefined {
    return findCoding(SYSTEM_SNOMED, this.resource.code)?.code;
  }

  get snomedDisplay(): string | undefined {
    return findCoding(SYSTEM_SNOMED, this.resource.code)?.display;
  }

  get snomedSystem(): string | undefined {
    return findCoding(SYSTEM_SNOMED, this.resource.code)?.system;
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

  get subjectID(): string {
    const [, subjectID] = this.resource.subject.reference?.split("/") || [];
    return subjectID || "";
  }

  get resourceType(): string {
    return this.resource.resourceType;
  }

  get verificationStatus(): string {
    return codeableConceptLabel(this.resource.verificationStatus);
  }
}

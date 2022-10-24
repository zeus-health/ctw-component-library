import { CONDITION_CODE_SYSTEMS } from "@/fhir/conditions";
import { findReference } from "@/fhir/resource-helper";
import { ResourceMap } from "@/fhir/types";
import { compact } from "lodash";
import {
  codeableConceptLabel,
  findCoding,
  findCodingByOrderOfPreference,
} from "../fhir/codeable-concept";
import { formatDateISOToLocal, formatStringToDate } from "../fhir/formatters";
import { SYSTEM_CCS, SYSTEM_ICD10, SYSTEM_SNOMED } from "../fhir/system-urls";
import { PatientModel } from "./patients";

export class ConditionModel {
  public resource: fhir4.Condition;

  private includedResources?: ResourceMap;

  constructor(condition: fhir4.Condition, includedResources?: ResourceMap) {
    this.resource = condition;
    this.includedResources = includedResources;
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

  get ccsGrouping(): string | undefined {
    return findCoding(SYSTEM_CCS, this.resource.code)?.display;
  }

  get clinicalStatus(): string {
    return codeableConceptLabel(this.resource.clinicalStatus);
  }

  get codings(): fhir4.CodeableConcept | undefined {
    return this.resource.code;
  }

  get preferredCoding(): fhir4.Coding | undefined {
    return findCodingByOrderOfPreference(this.resource.code);
  }

  get preferredSystem(): string | undefined {
    return findCodingByOrderOfPreference(this.resource.code)?.system;
  }

  get display(): string | undefined {
    return (
      findCodingByOrderOfPreference(this.resource.code)?.display ??
      codeableConceptLabel(this.resource.code)
    );
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

  get icd10Code(): string | undefined {
    return findCoding(SYSTEM_ICD10, this.resource.code)?.code;
  }

  get icd10System(): string | undefined {
    return findCoding(SYSTEM_ICD10, this.resource.code)?.system;
  }

  get icd10Display(): string | undefined {
    return findCoding(SYSTEM_ICD10, this.resource.code)?.display;
  }

  get id(): string {
    return this.resource.id || "";
  }

  get knownCodings(): fhir4.Coding[] {
    return compact(
      CONDITION_CODE_SYSTEMS.map((system) =>
        findCoding(system, this.resource.code)
      )
    );
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

    return formatStringToDate(this.resource.onsetString);
  }

  get patient(): PatientModel | undefined {
    const reference = findReference(
      "Patient",
      this.resource.contained,
      this.includedResources,
      this.resource.subject.reference
    );

    if (reference) {
      return new PatientModel(reference, this.includedResources);
    }

    return undefined;
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

  get snomedCoding(): fhir4.Coding | undefined {
    return findCoding(SYSTEM_SNOMED, this.resource.code);
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

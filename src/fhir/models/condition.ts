import { compact, find, intersectionWith, uniqWith } from "lodash";
import { formatDateISOToLocal, formatStringToDate } from "../formatters";
import {
  SYSTEM_CCS,
  SYSTEM_CONDITION_CLINICAL,
  SYSTEM_ICD10,
  SYSTEM_SNOMED,
} from "../system-urls";
import { FHIRModel } from "./fhir-model";
import { PatientModel } from "./patient";
import {
  codeableConceptLabel,
  findCoding,
  findCodingByOrderOfPreference,
  findCodingWithEnrichment,
} from "@/fhir/codeable-concept";
import { CONDITION_CODE_PREFERENCE_ORDER } from "@/fhir/conditions";
import { findReference } from "@/fhir/resource-helper";

export class ConditionModel extends FHIRModel<fhir4.Condition> {
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

  get active(): boolean {
    const coding = find(this.resource.clinicalStatus?.coding, {
      system: SYSTEM_CONDITION_CLINICAL,
    });

    return coding?.code
      ? ["active", "recurrence", "relapse"].includes(coding.code)
      : false;
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

  get display(): string | undefined {
    return (
      findCodingByOrderOfPreference(
        CONDITION_CODE_PREFERENCE_ORDER,
        this.resource.code
      )?.display ?? codeableConceptLabel(this.resource.code)
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

  get knownCodings(): fhir4.Coding[] {
    const codings = compact(
      CONDITION_CODE_PREFERENCE_ORDER.map((code) => {
        if (code.checkForEnrichment) {
          return findCodingWithEnrichment(code.system, this.resource.code);
        }
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

  // Returns true if any of the known codings match between
  // this condition and the passed in condition.
  knownCodingsMatch(condition: ConditionModel): boolean {
    return (
      intersectionWith(
        this.knownCodings,
        condition.knownCodings,
        (a, b) => a.code === b.code && a.system === b.system
      ).length > 0
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

  get preferredCoding(): fhir4.Coding | undefined {
    return findCodingByOrderOfPreference(
      CONDITION_CODE_PREFERENCE_ORDER,
      this.resource.code
    );
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

  get verificationStatus(): string {
    return codeableConceptLabel(this.resource.verificationStatus);
  }
}

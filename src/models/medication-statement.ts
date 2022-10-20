import type { Reference } from "fhir/r4";
import { codeableConceptLabel } from "@/fhir/codeable-concept";
import { dateToISO, formatDateISOToLocal } from "@/fhir/formatters";
import {
  getMedicationCodeableConcept,
  getRxNormCode,
  patientStatus,
} from "@/fhir/medication";
import type { ResourceMap } from "@/fhir/types";

export class MedicationStatementModel {
  readonly resourceType = "MedicationStatement";

  public resource: fhir4.MedicationStatement;

  readonly includedResources?: ResourceMap;

  private lensActiveRxNorms?: string[];

  readonly builderPatientRxNormStatus?: Record<string,string>;

  constructor(
    medicationStatement: fhir4.MedicationStatement,
    includedResources?: ResourceMap,
    lensActiveRxNorms?: string[],
    builderPatientRxNormStatus?: { [key: string]: string }
  ) {
    this.resource = medicationStatement;
    this.includedResources = includedResources;
    this.lensActiveRxNorms = lensActiveRxNorms;
    this.builderPatientRxNormStatus = builderPatientRxNormStatus;
  }

  get basedOn(): string | undefined {
    return this.resource.basedOn?.[0]?.type;
  }

  get category(): string {
    return codeableConceptLabel(this.resource.category);
  }

  get context(): string | undefined {
    return this.resource.context?.display;
  }

  get dateAsserted(): string | undefined {
    return formatDateISOToLocal(this.resource.dateAsserted);
  }

  set dateAsserted(dateAsserted: Date | string | undefined) {
    if (dateAsserted instanceof Date) {
      this.resource.dateAsserted = dateToISO(dateAsserted);
    } else {
      this.resource.dateAsserted = dateAsserted;
    }
  }

  get derivedFrom(): string[] {
    return this.resource.derivedFrom?.map(({ display }) => display || "") || [];
  }

  get display(): string {
    return codeableConceptLabel(
      getMedicationCodeableConcept(this.resource, this.includedResources)
    );
  }

  get dosage(): string | undefined {
    return this.resource.dosage?.[0]?.text;
  }

  get effectiveStart(): string | undefined {
    return formatDateISOToLocal(this.resource.effectivePeriod?.start);
  }

  get id(): string {
    return this.resource.id || "";
  }

  get identifier(): string | undefined {
    return this.resource.identifier?.[0]?.value;
  }

  get informationSourceDisplay(): string | undefined {
    const { informationSource } = this.resource;
    return informationSource
      ? `${informationSource.display}, ${informationSource.type}`
      : undefined;
  }

  get informationSource(): Reference | undefined {
    return this.resource.informationSource || undefined;
  }

  set informationSource(informationSource: Reference | undefined) {
    this.resource.informationSource = informationSource;
  }

  get lensStatus(): string {
    return this.lensActiveRxNorms?.includes(this.rxNorm ?? "")
      ? "active"
      : "inactive";
  }

  get medicationReference(): string | undefined {
    return this.resource.medicationReference?.display;
  }

  get notesDisplay(): string[] {
    return this.resource.note?.map(({ text }) => text) || [];
  }

  get partOf(): string | undefined {
    return this.resource.partOf?.[0]?.display;
  }

  get patientStatus(): string {
    return patientStatus(this.builderPatientRxNormStatus?.[this.rxNorm ?? ""]);
  }

  get rxNorm(): string | undefined {
    return getRxNormCode(this.resource, this.includedResources);
  }

  get reason(): string | undefined {
    return codeableConceptLabel(this.resource.reasonCode?.[0]);
  }

  get reasonReference():
    | fhir4.MedicationStatement["reasonReference"]
    | undefined {
    return this.resource.reasonReference;
  }

  get status(): string {
    return this.resource.status;
  }

  get statusReason(): string | undefined {
    return codeableConceptLabel(this.resource.statusReason?.[0]);
  }

  get subject(): Reference {
    return this.resource.subject
  }

  get subjectID(): string {
    const [, subjectID] = this.resource.subject.reference?.split("/") || [];
    return subjectID || "";
  }
}

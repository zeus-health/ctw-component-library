import { codeableConceptLabel } from "@/fhir/codeable-concept";
import { dateToISO, formatDateISOToLocal } from "@/fhir/formatters";
import {
  getIdentifyingRxNormCode,
  getMedicationCodeableConcept,
  patientStatus,
} from "@/fhir/medication";
import {
  LENS_EXTENSION_AGGREGATED_FROM,
  LENS_EXTENSION_MEDICATION_DAYS_SUPPLY,
  LENS_EXTENSION_MEDICATION_LAST_FILL_DATE,
  LENS_EXTENSION_MEDICATION_LAST_PRESCRIBED_DATE,
  LENS_EXTENSION_MEDICATION_QUANTITY,
  LENS_EXTENSION_MEDICATION_REFILLS,
} from "@/fhir/system-urls";
import type { ResourceMap } from "@/fhir/types";
import type { Reference } from "fhir/r4";
import { capitalize, compact, find, get } from "lodash/fp";

export class MedicationStatementModel {
  readonly resourceType = "MedicationStatement";

  public resource: fhir4.MedicationStatement;

  readonly includedResources?: ResourceMap;

  private lensActiveRxNorms?: string[];

  readonly builderPatientRxNormStatus?: Record<string, string>;

  constructor(
    medicationStatement: fhir4.MedicationStatement,
    includedResources?: ResourceMap
  ) {
    this.resource = medicationStatement;
    this.includedResources = includedResources;
  }

  toString() {
    const modelName = this.constructor.name;
    return `new ${modelName}(${JSON.stringify(this.resource, null, 2)}\n)`;
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

  get aggregatedFrom(): Reference[] {
    const extension = find(
      { url: LENS_EXTENSION_AGGREGATED_FROM },
      this.resource.extension
    );
    if (!extension?.extension) {
      return compact(this.resource.derivedFrom);
    }
    return compact(extension.extension.map(get("valueReference")));
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

  get informationSource(): Reference | undefined {
    return this.resource.informationSource || undefined;
  }

  set informationSource(informationSource: Reference | undefined) {
    this.resource.informationSource = informationSource;
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
    return getIdentifyingRxNormCode(this.resource, this.includedResources);
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
    return capitalize(this.resource.status);
  }

  get statusReason(): string | undefined {
    return codeableConceptLabel(this.resource.statusReason?.[0]);
  }

  get subject(): Reference {
    return this.resource.subject;
  }

  get subjectID(): string {
    const [, subjectID] = this.resource.subject.reference?.split("/") || [];
    return subjectID || "";
  }

  // lens extensions

  get lastFillDate(): string | undefined {
    return formatDateISOToLocal(
      this.resource.extension?.find(
        (x) => x.url === LENS_EXTENSION_MEDICATION_LAST_FILL_DATE
      )?.valueDateTime
    );
  }

  get quantity(): string | undefined {
    const quantity = this.resource.extension?.find(
      (x) => x.url === LENS_EXTENSION_MEDICATION_QUANTITY
    )?.valueQuantity;

    if (quantity) {
      return `${quantity.value} ${quantity.unit || ""}`;
    }
    return undefined;
  }

  get daysSupply(): string | undefined {
    return this.resource.extension
      ?.find((x) => x.url === LENS_EXTENSION_MEDICATION_DAYS_SUPPLY)
      ?.valueQuantity?.value?.toString();
  }

  get refills(): string | undefined {
    return this.resource.extension
      ?.find((x) => x.url === LENS_EXTENSION_MEDICATION_REFILLS)
      ?.valueUnsignedInt?.toString();
  }

  // TODO - this should actually resolve the reference, not just use the display!
  get lastPrescriber(): string | undefined {
    return formatDateISOToLocal(
      this.resource.extension?.find(
        (x) => x.url === LENS_EXTENSION_MEDICATION_LAST_PRESCRIBED_DATE
      )?.valueReference?.display
    );
  }

  get lastPrescribedDate(): string | undefined {
    return formatDateISOToLocal(
      this.resource.extension?.find(
        (x) => x.url === LENS_EXTENSION_MEDICATION_LAST_PRESCRIBED_DATE
      )?.valueDateTime
    );
  }
}

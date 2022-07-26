import type { Reference } from "fhir/r4";
import { capitalize, compact, find, get } from "lodash/fp";
import { FHIRModel } from "./fhir-model";
import { codeableConceptLabel } from "@/fhir/codeable-concept";
import { dateToISO, formatDateISOToLocal } from "@/fhir/formatters";
import {
  getIdentifyingRxNormCode,
  getIdentifyingRxNormCoding,
  getMedicationCodeableConcept,
  patientStatus,
} from "@/fhir/medication";
import { findReference } from "@/fhir/resource-helper";
import {
  CTW_EXTENSION_LENS_AGGREGATED_FROM,
  LENS_EXTENSION_AGGREGATED_FROM,
  LENS_EXTENSION_MEDICATION_DAYS_SUPPLY,
  LENS_EXTENSION_MEDICATION_LAST_FILL_DATE,
  LENS_EXTENSION_MEDICATION_LAST_PRESCRIBED_DATE,
  LENS_EXTENSION_MEDICATION_LAST_PRESCRIBER,
  LENS_EXTENSION_MEDICATION_QUANTITY,
  LENS_EXTENSION_MEDICATION_REFILLS,
} from "@/fhir/system-urls";

export class MedicationStatementModel extends FHIRModel<fhir4.MedicationStatement> {
  readonly builderPatientRxNormStatus?: Record<string, string>;

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
      (x) =>
        x.url === LENS_EXTENSION_AGGREGATED_FROM ||
        x.url === CTW_EXTENSION_LENS_AGGREGATED_FROM,
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

  get rxNormCoding() {
    return getIdentifyingRxNormCoding(this.resource, this.includedResources);
  }

  get dosage(): string | undefined {
    return this.resource.dosage?.[0]?.text;
  }

  get effectiveStart(): string | undefined {
    return formatDateISOToLocal(this.resource.effectivePeriod?.start);
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

  get lastPrescriber(): string | undefined {
    const reference = this.resource.extension?.find(
      (x) => x.url === LENS_EXTENSION_MEDICATION_LAST_PRESCRIBER
    )?.valueReference;

    if (!reference?.type || !reference.reference) {
      return undefined;
    }
    const resource = findReference(
      reference.type as "Practitioner" | "Organization",
      this.resource.contained,
      this.includedResources,
      reference.reference
    );
    if (resource?.name) {
      if (typeof resource.name === "string") {
        return resource.name;
      }
      const { family, given = [] } = resource.name[0];
      return compact([family, given[0]]).join(", ");
    }
    return reference.display;
  }

  get lastPrescribedDate(): string | undefined {
    return formatDateISOToLocal(
      this.resource.extension?.find(
        (x) => x.url === LENS_EXTENSION_MEDICATION_LAST_PRESCRIBED_DATE
      )?.valueDateTime
    );
  }
}

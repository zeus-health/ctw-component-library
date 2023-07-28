import type { DiagnosticReportModel } from "./diagnostic-report";
import { FHIRModel } from "./fhir-model";
import { SYSTEM_LOINC } from "../system-urls";
import { codeableConceptLabel } from "@/fhir/codeable-concept";
import { formatDateISOToLocal, formatPeriod, formatQuantity, formatRange } from "@/fhir/formatters";

export const LOINC_ANALYTES: Record<string, string> = {
  "17856-6": "a1c",
  "2345-7": "glucose",
  "4548-4": "a1c",
  "4549-2": "a1c",
  "18262-6": "Cholesterol in LDL [Mass/volume] in Serum or Plasma by Direct assay",
  "13457-7": "Cholesterol in LDL [Mass/volume] in Serum or Plasma by Direct assay",
  "2089-1": "Cholesterol in LDL [Mass/volume] in Serum or Plasma by Direct assay",
  "39469-2": "Cholesterol in LDL [Mass/volume] in Serum or Plasma by Direct assay",
  "46985-8": "Cholesterol in LDL [Mass/volume] in Serum or Plasma by Direct assay",
  "2093-3": "Cholesterol [Mass/volume] in Serum or Plasma",
  "48620-9": "Cholesterol [Mass/volume] in Serum or Plasma",
  "35200-5": "Cholesterol [Mass/volume] in Serum or Plasma",
  "2085-9": "Cholesterol in HDL [Mass/volume] in Serum or Plasma",
  "2086-7": "Cholesterol in HDL [Mass/volume] in Serum or Plasma",
  "49130-8": "Cholesterol in HDL [Mass/volume] in Serum or Plasma",
  "9832-7": "Cholesterol in HDL [Mass/volume] in Serum or Plasma",
  "2571-8": "Triglyceride [Mass/volume] in Serum or Plasma",
  "12951-0": "Triglyceride [Mass/volume] in Serum or Plasma",
  "3043-7": "Triglyceride [Mass/volume] in Serum or Plasma",
  "14927-8": "Triglyceride [Mass/volume] in Serum or Plasma",
  "3048-6": "Triglyceride [Mass/volume] in Serum or Plasma",
  "3049-4": "Triglyceride [Mass/volume] in Serum or Plasma",
  "48643-1":
    "Glomerular filtration rate/1.73 sq M.predicted among blacks [Volume Rate/Area] in Serum, Plasma or Blood by Creatinine-based formula (MDRD)",
  "33914-3":
    "Glomerular filtration rate/1.73 sq M.predicted among blacks [Volume Rate/Area] in Serum, Plasma or Blood by Creatinine-based formula (MDRD)",
  "77147-7":
    "Glomerular filtration rate/1.73 sq M.predicted among blacks [Volume Rate/Area] in Serum, Plasma or Blood by Creatinine-based formula (MDRD)",
  "50044-7":
    "Glomerular filtration rate/1.73 sq M.predicted among blacks [Volume Rate/Area] in Serum, Plasma or Blood by Creatinine-based formula (MDRD)",
  "70969-1":
    "Glomerular filtration rate/1.73 sq M.predicted among blacks [Volume Rate/Area] in Serum, Plasma or Blood by Creatinine-based formula (MDRD)",
  "48642-3":
    "Glomerular filtration rate/1.73 sq M.predicted among blacks [Volume Rate/Area] in Serum, Plasma or Blood by Creatinine-based formula (MDRD)",
  "88294-4":
    "Glomerular filtration rate/1.73 sq M.predicted among blacks [Volume Rate/Area] in Serum, Plasma or Blood by Creatinine-based formula (MDRD)",
  "88293-6":
    "Glomerular filtration rate/1.73 sq M.predicted among blacks [Volume Rate/Area] in Serum, Plasma or Blood by Creatinine-based formula (MDRD)",
  "62238-1":
    "Glomerular filtration rate/1.73 sq M.predicted among blacks [Volume Rate/Area] in Serum, Plasma or Blood by Creatinine-based formula (MDRD)",
  "69405-9":
    "Glomerular filtration rate/1.73 sq M.predicted among blacks [Volume Rate/Area] in Serum, Plasma or Blood by Creatinine-based formula (MDRD)",
};

export class ObservationModel extends FHIRModel<fhir4.Observation> {
  kind = "Observation" as const;

  private trendData: ObservationModel[];

  public diagnosticReportModel?: DiagnosticReportModel;

  constructor(resource: fhir4.Observation, trendData?: ObservationModel[]) {
    super(resource);
    this.trendData = filterAndSortTrends(this.resource, trendData ?? []);
  }

  get category() {
    return codeableConceptLabel(this.resource.category?.[0]);
  }

  get diagnosticReport() {
    return this.diagnosticReportModel;
  }

  setDiagnosticReport(diagnosticReport: DiagnosticReportModel) {
    this.diagnosticReportModel = diagnosticReport;
  }

  get display() {
    const filteredCoding = this.resource.code.coding?.find(
      (coding) => coding.display !== "unknown" && coding.display
    );

    if (filteredCoding) {
      return filteredCoding.display || filteredCoding.code;
    }

    return codeableConceptLabel(this.resource.code);
  }

  get effectiveStart() {
    return formatDateISOToLocal(this.effectiveStartRaw);
  }

  get effectiveStartRaw() {
    return this.resource.effectivePeriod?.start || this.resource.effectiveDateTime;
  }

  get identifier() {
    return this.resource.identifier?.[0].value ?? "";
  }

  get performer() {
    return this.resource.performer?.[0].display;
  }

  get value(): string {
    if (this.resource.valueBoolean !== undefined) {
      return this.resource.valueBoolean ? "true" : "false";
    }

    if (this.resource.valueCodeableConcept) {
      return codeableConceptLabel(this.resource.valueCodeableConcept);
    }

    if (this.resource.valueDateTime) {
      return this.resource.valueDateTime;
    }

    if (this.resource.valueInteger !== undefined) {
      return String(this.resource.valueInteger);
    }

    if (this.resource.valuePeriod) {
      return formatPeriod(this.resource.valuePeriod);
    }

    if (this.resource.valueQuantity) {
      return formatQuantity(this.resource.valueQuantity);
    }

    if (this.resource.valueRange) {
      return formatRange(this.resource.valueRange);
    }

    if (this.resource.valueString) {
      return this.resource.valueString;
    }

    if (this.resource.valueTime) {
      return this.resource.valueTime;
    }

    return "";
  }

  get unit() {
    return this.resource.valueQuantity?.unit;
  }

  get valueString(): string | number | undefined {
    return this.resource.valueString || this.resource.valueQuantity?.value;
  }

  get interpretation() {
    const nonAcceptedValues = [
      "n",
      "noinformation",
      "normal",
      "na",
      "(normal)",
      "unknown",
      "not applicable",
      "temporarily unavailable",
      "nml",
      "norm",
      "*",
    ];

    const interpretation = codeableConceptLabel(this.resource.interpretation?.[0]).toLowerCase();
    if (nonAcceptedValues.includes(interpretation)) {
      return undefined;
    }

    return interpretation;
  }

  get notes() {
    return this.resource.note?.[0].text ?? "";
  }

  get referenceRange() {
    return this.resource.referenceRange?.[0].text;
  }

  get trends() {
    return this.trendData;
  }

  get acceptedInterpretations(): string {
    switch (codeableConceptLabel(this.resource.interpretation?.[0]).toLowerCase()) {
      case "high":
      case "low":
      case "hi":
      case "abn":
      case "(high)":
      case "(low)":
      case "abnormal":
      case "a":
      case "l":
      case "h":
      case "above high normal":
      case "crit":
      case "below low normal":
      case "high alert":
      case "(abnormal)":
      case "abnormal alert":
      case "abnormal low":
      case "abnormal high":
      case "low alert":
      case "pos":
      case "no reference range":
      case "positive":
      case "(positive)":
      case "(critical high)":
      case "(critical low)":
      case "critical high":
      case "critical low":
      case "c":
        return "ctw-text-caution-heading ctw-bg-caution-light ctw-inline-flex ctw-rounded-xl ctw-font-medium ctw-text-sm ctw-p-1 ctw-px-3";
      default:
        return "ctw-text-content-black ctw-bg-bg-light ctw-inline-flex ctw-rounded-xl ctw-leading-5 ctw-font-medium ctw-text-sm ctw-p-1 ctw-px-3";
    }
  }
}

function filterAndSortTrends(resource: fhir4.Observation, trends: ObservationModel[]) {
  let filtered = trends.filter((t) =>
    resource.code.coding?.some((coding) => coding.code && hasSimilarAnalyte(t, coding.code))
  );

  filtered = filtered.sort((a, b) => {
    const aStart = a.effectiveStartRaw;
    const bStart = b.effectiveStartRaw;

    if (!aStart && !bStart) {
      return 0;
    }
    if (!aStart) {
      return 1;
    }
    if (!bStart) {
      return -1;
    }
    if (aStart > bStart) {
      return -1;
    }
    if (aStart < bStart) {
      return 1;
    }
    return 0;
  });
  return filtered;
}

function hasSimilarAnalyte(model: ObservationModel, code: string) {
  const analyte = LOINC_ANALYTES[code];
  if (!analyte) {
    return false;
  }
  const similarAnalyte = model.resource.code.coding?.some(
    (coding) =>
      coding.system === SYSTEM_LOINC && coding.code && analyte === LOINC_ANALYTES[coding.code]
  );
  return similarAnalyte;
}

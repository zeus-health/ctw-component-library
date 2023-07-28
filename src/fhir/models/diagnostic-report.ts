import { Coding, DiagnosticReport, Observation } from "fhir/r4";
import { FHIRModel } from "./fhir-model";
import { ObservationModel } from "./observation";
import { ResourceMap } from "../types";
import { codeableConceptLabel, findCodingByOrderOfPreference } from "@/fhir/codeable-concept";
import { formatDateISOToLocal } from "@/fhir/formatters";
import { findReference } from "@/fhir/resource-helper";
import { SYSTEM_DIAGNOSTIC_SERVICE_SECTION_ID, SYSTEM_SNOMED } from "@/fhir/system-urls";
import { find } from "@/utils/nodash";

export class DiagnosticReportModel extends FHIRModel<fhir4.DiagnosticReport> {
  kind = "DiagnosticReport" as const;

  private observationModels: ObservationModel[];

  constructor(
    resource: DiagnosticReport,
    includedResources?: ResourceMap,
    revIncludes?: fhir4.Resource[],
    trendData?: ObservationModel[]
  ) {
    super(resource, includedResources, revIncludes);

    this.observationModels =
      this.resource.result?.map(
        (result) =>
          // @ts-ignore: Unreachable code error
          // We are disabling it for this line as the FHIR spec doesn't support this
          // customized result field that now has the observation resource and not only just a reference.
          new ObservationModel(result.resource, trendData)
      ) ?? [];

    const trends = trendData?.filter((o) => this.observationModels.some((om) => om.id === o.id));
    trends?.forEach((t) => t.setDiagnosticReport(this));
  }

  get category() {
    const category = codeableConceptLabel(this.resource.category?.[0]) || this.reportCategory;
    if (category) {
      return category;
    }

    const label = codeableConceptLabel(this.resource.category?.[0]);
    return (
      findReference("Observation", undefined, this.includedResources, this.resource.result?.[0])
        ?.category ?? `No display value found ${label ? " for " : ""}${label}`
    );
  }

  get displayName() {
    return (
      standardizedLoincDisplay(this.resource.code.coding)?.display ||
      firstDisplay(this.resource.code.coding)?.display ||
      codeableConceptLabel(this.resource.code)
    );
  }

  get effectiveStart() {
    return (
      formatDateISOToLocal(
        this.resource.effectivePeriod?.start || this.resource.effectiveDateTime
      ) ||
      inferStartDateFromResults(
        this.resource.result?.map((ref) =>
          findReference("Observation", undefined, this.includedResources, ref)
        )
      )
    );
  }

  get effectiveEnd() {
    if (this.resource.effectivePeriod?.end) {
      return formatDateISOToLocal(this.resource.effectivePeriod.end);
    }
    return (
      this.effectiveStart ||
      inferEndDateFromResults(
        this.resource.result?.map((ref) =>
          findReference("Observation", undefined, this.includedResources, ref)
        )
      ) ||
      inferStartDateFromResults(
        this.resource.result?.map((ref) =>
          findReference("Observation", undefined, this.includedResources, ref)
        )
      )
    );
  }

  get identifier() {
    return this.resource.identifier?.[0].value ?? "";
  }

  get details() {
    if (!this.results.length) {
      return "";
    }
    const tResult = this.results.length > 1 ? "results" : "result";
    let display = `${this.results.length} ${tResult}`;
    if (this.hasTrends) {
      display += ", result trend available";
    }
    return display;
  }

  get hasTrends() {
    return this.observations.some((o) => o.trends.length > 1);
  }

  get performer() {
    return this.organization?.display || this.resource.performer?.[0].display;
  }

  get organization() {
    const performer = this.resource.performer ?? [];
    return find(performer, { type: "Organization" });
  }

  get reportCategory() {
    return (
      findCodingByOrderOfPreference(
        [{ system: SYSTEM_DIAGNOSTIC_SERVICE_SECTION_ID }, { system: SYSTEM_SNOMED }],
        this.resource.code
      )?.display ?? codeableConceptLabel(this.resource.code)
    );
  }

  get results() {
    return this.resource.result ?? [];
  }

  get observations() {
    return this.observationModels;
  }
}

export const standardizedLoincDisplay = (coding?: Coding[]) => {
  if (!coding) {
    return undefined;
  }

  return coding.find(
    (x) =>
      x.extension &&
      x.extension.find(
        (ext) =>
          ext.valueString === "LOINC Standardization" &&
          ext.url === "https://zusapi.com/terminology/enrichment"
      ) &&
      x.display &&
      x.system !== "http://terminology.hl7.org/CodeSystem/v3-NullFlavor"
  );
};

export const firstDisplay = (coding?: Coding[]): Coding | undefined => {
  if (!coding) {
    return undefined;
  }

  return (
    coding
      // filter out null flavor
      .filter((x) => x.system !== "http://terminology.hl7.org/CodeSystem/v3-NullFlavor")
      // find the first one that has a truthy display
      .find((x) => x.display)
  );
};

export const filterOutFalsy = <T>(arr: (T | undefined)[] | undefined): T[] => {
  if (!arr) {
    return [];
  }

  // this makes me sad, but TypeScript isn't smart enough to figure this out
  return arr.filter((x) => x) as T[];
};

// go through all possible values, grab the maximum date, or undefined
// if nothing was found
export const inferStartDateFromResults = (results: (Observation | undefined)[] | undefined) =>
  filterOutFalsy(results)
    .map(
      (obs) =>
        formatDateISOToLocal(obs.effectivePeriod?.start) ||
        formatDateISOToLocal(obs.effectiveDateTime) ||
        formatDateISOToLocal(obs.effectiveInstant)
    )
    .reduce((d, min) => {
      if (!d) {
        return min;
      }
      if (!min) {
        return d;
      }
      return Date.parse(d) < Date.parse(min) ? d : min;
    }, undefined as unknown as string);

// go through all possible values, grab the maximum date, or undefined
// if nothing was found
export const inferEndDateFromResults = (results: (Observation | undefined)[] | undefined) =>
  filterOutFalsy(results)
    .map(
      (obs) =>
        formatDateISOToLocal(obs.effectivePeriod?.start) ||
        formatDateISOToLocal(obs.effectiveDateTime) ||
        formatDateISOToLocal(obs.effectiveInstant)
    )
    .reduce((d, min) => {
      if (!d) {
        return min;
      }
      if (!min) {
        return d;
      }
      return Date.parse(d) > Date.parse(min) ? d : min;
    }, undefined as unknown as string);

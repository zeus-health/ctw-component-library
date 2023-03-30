import { ResourceMap } from "../types";
import { FHIRModel } from "./fhir-model";
import { PatientModel } from "./patient";
import { PatientHistoryResponse } from "@/components/content/patient-history/use-patient-history";

export class PatientHistoryPatient extends FHIRModel<PatientModel> {
  kind = "PatientHistoryPatient" as const;

  historyInfo: PatientHistoryResponse = {};

  constructor(
    resource: PatientModel,
    historyInfo: PatientHistoryResponse,
    includedResources?: ResourceMap
  ) {
    super(resource, includedResources);
    this.historyInfo = historyInfo as PatientHistoryResponse;
  }

  get lastRetrievedAt() {
    return this.historyInfo.lastRetrievedAt;
  }

  get retrievedStatus() {
    return this.historyInfo.status;
  }
}

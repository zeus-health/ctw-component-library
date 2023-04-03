import { formatISODateStringToDate } from "../formatters";
import { ResourceMap } from "../types";
import { FHIRModel } from "./fhir-model";
import { PatientModel } from "./patient";
import { PatientHistoryResponse } from "@/components/content/patient-history/use-patient-history";
import { PatientRefreshHistoryMessage } from "@/services/patient-history/patient-history-types";

export class PatientHistoryPatient extends FHIRModel<PatientModel> {
  kind = "PatientHistoryPatient" as const;

  historyInfo: PatientRefreshHistoryMessage | undefined = undefined;

  constructor(
    resource: PatientModel,
    historyInfo: PatientHistoryResponse,
    includedResources?: ResourceMap
  ) {
    super(resource, includedResources);
    this.historyInfo = historyInfo as PatientRefreshHistoryMessage;
  }

  get lastRetrievedAt() {
    // eslint-disable-next-line no-underscore-dangle
    return formatISODateStringToDate(this.historyInfo?._lastUpdated);
  }

  get retrievedStatus() {
    return this.historyInfo?.status;
  }
}

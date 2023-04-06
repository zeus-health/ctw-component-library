import { FHIRModel } from "./fhir-model";
import { PatientModel } from "./patient";
import { formatDate, formatISODateStringToDate } from "../formatters";
import { ResourceMap } from "../types";
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

  get messages() {
    // eslint-disable-next-line no-underscore-dangle
    return this.historyInfo?._messages;
  }

  get lastRetrievedAt() {
    // eslint-disable-next-line no-underscore-dangle
    return formatISODateStringToDate(this.historyInfo?._lastUpdated);
  }

  get createdAt() {
    return formatDate(
      // eslint-disable-next-line no-underscore-dangle
      this.historyInfo?._createdAt,
      "MM/dd/yy HH:mm"
    );
  }

  get retrievedStatus() {
    return this.historyInfo?.status;
  }
}

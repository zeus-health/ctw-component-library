import { PatientModel } from "./patient";
import { formatDate, formatISODateStringToDate } from "../formatters";
import { PatientRefreshHistoryMessage } from "@/services/patient-history/patient-history-types";

export class PatientHistoryRequestModel {
  kind = "PatientHistory" as const;

  historyInfo: PatientRefreshHistoryMessage | undefined = undefined;

  patient: PatientModel;

  constructor(patient: PatientModel, historyInfo: PatientRefreshHistoryMessage) {
    this.patient = patient;
    this.historyInfo = historyInfo as PatientRefreshHistoryMessage;
  }

  get messages() {
    // eslint-disable-next-line no-underscore-dangle
    return this.historyInfo?._messages;
  }

  get key() {
    // eslint-disable-next-line no-underscore-dangle
    return this.historyInfo?.uuid || "";
  }

  get lastRetrievedAt() {
    // eslint-disable-next-line no-underscore-dangle
    return formatISODateStringToDate(this.historyInfo?._lastUpdated);
  }

  get createdAt() {
    return formatDate(
      // eslint-disable-next-line no-underscore-dangle
      this.historyInfo?._createdAt,
      "M/d/yy h:mm a"
    );
  }

  get retrievedStatus() {
    return this.historyInfo?.status;
  }
}

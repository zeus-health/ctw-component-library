import { format } from "date-fns";
import { PatientModel } from "./patient";
import { formatISODateStringToDate } from "../formatters";
import { PatientHistoryJobResponseJobData } from "@/services/patient-history/patient-history-types";

export class PatientHistoryRequestModel {
  kind = "PatientHistory" as const;

  historyInfo: PatientHistoryJobResponseJobData | undefined = undefined;

  patient: PatientModel;

  constructor(patient: PatientModel, historyInfo: PatientHistoryJobResponseJobData | undefined) {
    this.patient = patient;
    this.historyInfo = historyInfo;
  }

  get providers() {
    return this.historyInfo?.attributes.providers;
  }

  get key() {
    return this.historyInfo?.id || "";
  }

  get lastRetrievedAt() {
    return formatISODateStringToDate(this.historyInfo?.attributes.createdAt);
  }

  get createdAt() {
    if (!this.historyInfo?.attributes.createdAt) {
      return undefined;
    }

    return format(new Date(Number(this.historyInfo.attributes.createdAt) * 1000), "M/d/yy h:mm a");
  }
}

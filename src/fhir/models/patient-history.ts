import { format } from "date-fns";
import { PatientModel } from "./patient";
import { formatISODateStringToDate } from "../formatters";
import { PatientHistoryJob } from "@/services/patient-history/patient-history-types";

export class PatientHistoryRequestModel {
  kind = "PatientHistory" as const;

  historyInfo: PatientHistoryJob | undefined = undefined;

  patient: PatientModel;

  constructor(patient: PatientModel, historyInfo: PatientHistoryJob | undefined) {
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

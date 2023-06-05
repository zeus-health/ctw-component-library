import { ViewOption } from "../../resource/helpers/view-button";
import { MedicationStatementModel } from "@/fhir/models";

type Status = fhir4.MedicationStatement["status"];

const current: Status[] = ["active", "unknown", "on-hold", "intended", "not-taken"];
const past: Status[] = ["completed", "stopped", "entered-in-error"];

export const medicationViews: ViewOption<MedicationStatementModel>[] = [
  {
    display: "Current",
    filters: [{ key: "status", type: "checkbox", selected: current }],
  },
  {
    display: "Past",
    filters: [{ key: "status", type: "checkbox", selected: past }],
  },
  { display: "All", filters: [] },
];

export const defaultMedicationView = medicationViews[0];

import { ViewOption } from "../../resource/helpers/view-button";

type Status = fhir4.MedicationStatement["status"];

const current: Status[] = [
  "active",
  "unknown",
  "on-hold",
  "intended",
  "not-taken",
];
const past: Status[] = ["completed", "stopped", "entered-in-error"];

export const medicationViews: ViewOption[] = [
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

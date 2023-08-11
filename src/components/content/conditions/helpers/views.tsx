import { ViewOption } from "../../resource/helpers/view-button";
import { ConditionModel, ConditionStatuses } from "@/fhir/models/condition";

// Filter for clinicalStatus and/or verificationStatus
function statusFilter(statuses: ConditionStatuses[]) {
  return (data: ConditionModel[]) => data.filter((c) => statuses.includes(c.displayStatus));
}

const viewOptions: ViewOption<ConditionModel>[] = [
  {
    display: "Current",
    filters: [statusFilter(["Active", "Pending", "Unknown"])],
  },
  {
    display: "Past",
    filters: [statusFilter(["Inactive", "Refuted"])],
  },
  {
    display: "All",
    filters: [(data: ConditionModel[]) => data],
  },
];

export const statusView = {
  viewOptions,
  current: viewOptions[0],
  past: viewOptions[1],
  all: viewOptions[2],
};

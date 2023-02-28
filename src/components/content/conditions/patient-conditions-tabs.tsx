import { PatientHistoryStatus } from "../patient-history/patient-history-message-status";
import { usePatientHistory } from "../patient-history/use-patient-history";
import { FilterCollection } from "./patient-conditions-filters";
import { Badge } from "@/components/core/badge";
import { TabGroup, TabGroupItem } from "@/components/core/tab-group/tab-group";
import { useOtherProviderConditionsDeduped } from "@/fhir/conditions";
import { ConditionModel } from "@/fhir/models";

export type PatientConditionsTabsProps = {
  collection: FilterCollection;
  forceHorizontalTabs?: boolean;
  onCollectionChange: (collection: FilterCollection) => void;
};

const tabbedContent: TabGroupItem<ConditionModel>[] = [
  {
    key: "inactive-provider-records",
    display: () => "condition list",
    render: () => null,
  },
  {
    key: "other-provider-records",
    display: () => (
      <>
        <span className="ctw-pr-2 ctw-capitalize">other provider records</span>
        <BadgeOtherProviderConditionsCount />
      </>
    ),
    render: () => null,
  },
];

export function PatientConditionsTabs({
  collection,
  onCollectionChange,
  forceHorizontalTabs = false,
}: PatientConditionsTabsProps) {
  const patientHistory = usePatientHistory();

  return (
    <>
      {collection === "other" && (
        <PatientHistoryStatus
          status={patientHistory.lastStatus}
          date={patientHistory.dateCreatedAt}
        />
      )}
      <TabGroup
        content={tabbedContent}
        forceHorizontalTabs={forceHorizontalTabs}
        onChange={(index) => {
          onCollectionChange(index === 0 ? "patient" : "other");
        }}
      />
    </>
  );
}

export const BadgeOtherProviderConditionsCount = () => {
  const otherConditionsQuery = useOtherProviderConditionsDeduped();
  const activeUnarchivedConditions = otherConditionsQuery.data.filter(
    (condition) => condition.displayStatus === "Active"
  );

  if (activeUnarchivedConditions.length > 0) {
    return (
      <Badge
        color="notification"
        text={activeUnarchivedConditions.length.toString()}
        className="ctw-h-5"
      />
    );
  }
  return null;
};

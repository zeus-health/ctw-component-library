import { PatientHistoryStatus } from "../patient-history/patient-history-message-status";
import { usePatientHistory } from "../patient-history/use-patient-history";
import { FilterCollection } from "./patient-conditions-filters";
import { Badge } from "@/components/core/badge";
import { TabGroup, TabGroupItem } from "@/components/core/tab-group/tab-group";
import { useOtherProviderConditions } from "@/fhir/conditions";
import { ConditionModel } from "@/fhir/models";

export type PatientConditionsTabsProps = {
  collection: FilterCollection;
  forceHorizontalTabs?: boolean;
  onCollectionChange: (collection: FilterCollection) => void;
  otherConditions: ConditionModel[];
};

const tabbedContent: TabGroupItem<ConditionModel>[] = [
  {
    key: "inactive-provider-records",
    getPanelClassName: (sm: boolean) => (sm ? "ctw-mt-0" : "ctw-mt-2"),
    display: () => "condition list",
    render: () => null,
  },
  {
    key: "other-provider-records",
    getPanelClassName: (sm: boolean) => (sm ? "ctw-mt-0" : "ctw-mt-2"),
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
  const otherConditionsQuery = useOtherProviderConditions();
  if (!otherConditionsQuery.data) {
    return null;
  }
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

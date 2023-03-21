import cx from "classnames";
import { MedsHistoryTempProps } from "@/components/content/medications-table-base";
import {
  BadgeOtherProviderMedCount,
  OtherProviderMedsTable,
  OtherProviderMedsTableProps,
} from "@/components/content/medications/other-provider-meds-table";
import { medicationFilters } from "@/components/content/medications/patient-medications-filters";
import {
  defaultMedicationSort,
  medicationSortOptions,
} from "@/components/content/medications/patient-medications-sort";
import { ProviderInactiveMedicationsTable } from "@/components/content/medications/provider-inactive-medications-table";
import { ProviderMedsTable } from "@/components/content/medications/provider-meds-table";
import * as CTWBox from "@/components/core/ctw-box";
import { FilterBar } from "@/components/core/filter-bar/filter-bar";
import { SortButton } from "@/components/core/sort-button/sort-button";
import { TabGroup, TabGroupItem } from "@/components/core/tab-group/tab-group";
import "./patient-medications.scss";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";

export type PatientMedicationsProps = {
  className?: string;
  forceHorizontalTabs?: boolean;
} & TabbedContentProps;

type TabbedContentProps = Pick<
  OtherProviderMedsTableProps,
  "hideAddToRecord" | "handleAddToRecord"
> &
  MedsHistoryTempProps;

// We use getPanelClassName on all tabs except for the other-provider-records
// tab because without the FilterBar there is no margin between tab and panel
// when md - lg sized.
const tabbedContent = (
  tabbedContentProps: TabbedContentProps
): TabGroupItem[] => [
  {
    key: "medication-list",
    display: () => "medication list",
    render: () => (
      <ProviderMedsTable
        onOpenHistoryDrawer={tabbedContentProps.onOpenHistoryDrawer}
        onAfterOpenHistoryDrawer={tabbedContentProps.onAfterOpenHistoryDrawer}
      />
    ),
  },
  {
    key: "inactive-provider-records",
    display: () => "inactive",
    render: () => (
      <ProviderInactiveMedicationsTable
        onOpenHistoryDrawer={tabbedContentProps.onOpenHistoryDrawer}
        onAfterOpenHistoryDrawer={tabbedContentProps.onAfterOpenHistoryDrawer}
      />
    ),
  },
  {
    key: "other-provider-records",
    display: () => (
      <>
        <span className="ctw-pr-2 ctw-capitalize">other provider records</span>
        <BadgeOtherProviderMedCount />
      </>
    ),
    render: () => <OtherProviderMedsTableTab {...tabbedContentProps} />,
  },
];

export function OtherProviderMedsTableTab({
  handleAddToRecord,
  hideAddToRecord,
  onOpenHistoryDrawer,
  onAfterOpenHistoryDrawer,
}: PatientMedicationsProps) {
  const { otherProviderMedications } = useQueryAllPatientMedications();
  const { data, filters, setFilters, setSort } = useFilteredSortedData({
    defaultFilters: {},
    defaultSort: defaultMedicationSort,
    records: otherProviderMedications,
  });
  return (
    <div className="ctw-scrollable-pass-through-height">
      <div className="ctw-flex ctw-flex-wrap ctw-gap-x-2">
        <SortButton
          className="ctw-my-2"
          options={medicationSortOptions}
          onChange={setSort}
          defaultSort={defaultMedicationSort}
        />
        <FilterBar
          filters={medicationFilters(otherProviderMedications ?? [])}
          onChange={setFilters}
          defaultState={{}}
        />
      </div>
      <div className="ctw-scrollable-pass-through-height ctw-w-full">
        <OtherProviderMedsTable
          records={data}
          showDismissed={!!filters.isArchived}
          handleAddToRecord={handleAddToRecord}
          hideAddToRecord={hideAddToRecord}
          onOpenHistoryDrawer={onOpenHistoryDrawer}
          onAfterOpenHistoryDrawer={onAfterOpenHistoryDrawer}
        />
      </div>
    </div>
  );
}

/**
 * This component is a tabbed view of patient medications from the current
 * provider, other providers and historical. When rendered in a small breakpoint
 * the component will change from horizontal tabs to a vertical dropdown menu.
 * If this is undesired, you may set the property `forceHorizontalTabs` to true
 * and the tabs will remain visible and horizontal. The `forceHorizontalTabs`
 * prop will not prevent the medication tables from switching to their stacked
 * view when viewed on smaller screens.
 */
export function PatientMedications({
  className,
  forceHorizontalTabs = false,
  ...tabbedContentProps
}: PatientMedicationsProps) {
  const tabItems = tabbedContent(tabbedContentProps);

  return (
    <CTWBox.StackedWrapper
      className={cx(
        "ctw-patient-medications ctw-scrollable-pass-through-height ctw-space-y-3 ctw-bg-white",
        className
      )}
    >
      <TabGroup
        content={tabItems}
        forceHorizontalTabs={forceHorizontalTabs}
        className={className}
      />
    </CTWBox.StackedWrapper>
  );
}

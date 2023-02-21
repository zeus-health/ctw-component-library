import type {
  FilterChangeEvent,
  FilterItem,
} from "@/components/core/filter-bar/filter-bar-types";
import cx from "classnames";
import { useEffect, useState } from "react";
import { MedsHistoryTempProps } from "@/components/content/medications-table-base";
import {
  BadgeOtherProviderMedCount,
  OtherProviderMedsTable,
  OtherProviderMedsTableProps,
} from "@/components/content/medications/other-provider-meds-table";
import { ProviderInactiveMedicationsTable } from "@/components/content/medications/provider-inactive-medications-table";
import { ProviderMedsTable } from "@/components/content/medications/provider-meds-table";
import * as CTWBox from "@/components/core/ctw-box";
import { FilterBar } from "@/components/core/filter-bar/filter-bar";
import { TabGroup, TabGroupItem } from "@/components/core/tab-group/tab-group";
import { MedicationStatementModel } from "@/fhir/models";
import "./patient-medications.scss";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";
import { compact } from "@/utils/nodash";
import { uniq } from "@/utils/nodash/fp";

export type PatientMedicationsTabbedProps = {
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
): TabGroupItem<MedicationStatementModel>[] => [
  {
    key: "medication-list",
    getPanelClassName: (sm: boolean) => (sm ? "ctw-mt-0" : "ctw-mt-2"),
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
    getPanelClassName: (sm: boolean) => (sm ? "ctw-mt-0" : "ctw-mt-2"),
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
}: PatientMedicationsTabbedProps) {
  const [filters, setFilters] = useState<FilterChangeEvent>({});
  const [records, setRecords] = useState<MedicationStatementModel[]>([]);
  const { otherProviderMedications, isLoading } =
    useQueryAllPatientMedications();

  useEffect(() => {
    if (!isLoading && otherProviderMedications) {
      const filteredRecords = otherProviderMedications.filter((medication) => {
        if (
          Array.isArray(filters.providers?.selected) &&
          filters.providers?.selected.length
        ) {
          return filters.providers.selected.includes(
            medication.lastPrescriber as string
          );
        }
        return true;
      });
      setRecords(filteredRecords);
    }
  }, [filters, otherProviderMedications, isLoading]);

  const showDismissed = "dismissed" in filters;
  const showInactive = "inactive" in filters;

  // Create a list of prescriber names to use in a filter
  const prescriberNames = !otherProviderMedications
    ? []
    : (uniq(
        otherProviderMedications
          .map((medication) => medication.lastPrescriber)
          .filter((s) => typeof s === "string")
      ) as string[]);

  const filterItems: FilterItem[] = compact([
    {
      key: "dismissed",
      type: "tag",
      icon: "eye",
      display: ({ active }) =>
        active ? "dismissed records" : "show dismissed records",
    },
    !otherProviderMedications || prescriberNames.length < 2
      ? null
      : {
          key: "providers",
          type: "checkbox",
          icon: "clipboard",
          values: prescriberNames,
          display: "prescriber",
        },
  ]);

  return (
    <>
      <FilterBar filters={filterItems} handleOnChange={setFilters} />
      <OtherProviderMedsTable
        records={records}
        handleAddToRecord={handleAddToRecord}
        hideAddToRecord={hideAddToRecord}
        showDismissed={showDismissed}
        showInactive={showInactive}
        onOpenHistoryDrawer={onOpenHistoryDrawer}
        onAfterOpenHistoryDrawer={onAfterOpenHistoryDrawer}
      />
    </>
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
export function PatientMedicationsTabbed({
  className,
  forceHorizontalTabs = false,
  ...tabbedContentProps
}: PatientMedicationsTabbedProps) {
  const tabItems = tabbedContent(tabbedContentProps);

  return (
    <CTWBox.StackedWrapper
      className={cx(
        "ctw-patient-medications ctw-space-y-3 ctw-bg-white",
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

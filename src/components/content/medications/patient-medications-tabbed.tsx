import type {
  FilterChangeEvent,
  FilterItem,
} from "@/components/core/filter-bar/filter-bar-types";
import cx from "classnames";
import { useState } from "react";
import {
  BadgeOtherProviderMedCount,
  OtherProviderMedsTable,
} from "@/components/content/medications/other-provider-meds-table";
import { ProviderInactiveMedicationsTable } from "@/components/content/medications/provider-inactive-medications-table";
import { ProviderMedsTable } from "@/components/content/medications/provider-meds-table";
import * as CTWBox from "@/components/core/ctw-box";
import { FilterBar } from "@/components/core/filter-bar/filter-bar";
import { TabGroup, TabGroupItem } from "@/components/core/tab-group/tab-group";
import { MedicationStatementModel } from "@/fhir/models";
import "./patient-medications.scss";

export type PatientMedicationsTabbedProps = {
  className?: string;
  forceHorizontalTabs?: boolean;
  handleAddToRecord: (m: MedicationStatementModel) => void;
};

// We use getPanelClassName on all tabs except for the other-provider-records
// tab because without the FilterBar there is no margin between tab and panel
// when md - lg sized.
const tabbedContent = (
  addToRecord: (m: MedicationStatementModel) => void
): TabGroupItem<MedicationStatementModel>[] => [
  {
    key: "medication-list",
    getPanelClassName: (sm: boolean) => (sm ? "ctw-mt-0" : "ctw-mt-2"),
    display: () => "medication list",
    render: () => <ProviderMedsTable />,
  },
  {
    key: "inactive-provider-records",
    getPanelClassName: (sm: boolean) => (sm ? "ctw-mt-0" : "ctw-mt-2"),
    display: () => "inactive",
    render: () => <ProviderInactiveMedicationsTable />,
  },
  {
    key: "other-provider-records",
    display: () => (
      <>
        <span className="ctw-pr-2 ctw-capitalize">other provider records</span>
        <BadgeOtherProviderMedCount />
      </>
    ),
    render: () => <OtherProviderMedsTableTab handleAddToRecord={addToRecord} />,
  },
];

function OtherProviderMedsTableTab({
  handleAddToRecord,
}: PatientMedicationsTabbedProps) {
  const [filters, setFilters] = useState<FilterChangeEvent>({});
  const showDismissed = "dismissed" in filters;
  const showInactive = "inactive" in filters;
  const filterItems: FilterItem[] = [
    {
      key: "dismissed",
      type: "tag",
      icon: "eye",
      display: ({ active }) =>
        active ? "dismissed records" : "show dismissed records",
    },
  ];

  return (
    <>
      <FilterBar filters={filterItems} handleOnChange={setFilters} />
      <OtherProviderMedsTable
        showDismissed={showDismissed}
        showInactive={showInactive}
        handleAddToRecord={handleAddToRecord}
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
  handleAddToRecord,
}: PatientMedicationsTabbedProps) {
  const tabItems = tabbedContent(handleAddToRecord);

  return (
    <CTWBox.StackedWrapper
      className={cx("ctw-patient-medications ctw-space-y-3", className)}
    >
      <TabGroup
        content={tabItems}
        forceHorizontalTabs={forceHorizontalTabs}
        className={className}
      />
    </CTWBox.StackedWrapper>
  );
}

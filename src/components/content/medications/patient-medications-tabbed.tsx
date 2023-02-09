import type {
  FilterChangeEvent,
  FilterItem,
} from "@/components/core/filter-bar/filter-bar-types";
import cx from "classnames";
import { useEffect, useState } from "react";
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
} & SubsetOtherProviderTableProps;
type SubsetOtherProviderTableProps = Pick<
  OtherProviderMedsTableProps,
  "hideAddToRecord" | "handleAddToRecord"
>;

// We use getPanelClassName on all tabs except for the other-provider-records
// tab because without the FilterBar there is no margin between tab and panel
// when md - lg sized.
const tabbedContent = (
  otherProviderTableProps: SubsetOtherProviderTableProps
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
    render: () => <OtherProviderMedsTableTab {...otherProviderTableProps} />,
  },
];

export function OtherProviderMedsTableTab({
  handleAddToRecord,
  hideAddToRecord,
}: PatientMedicationsTabbedProps) {
  const [filters, setFilters] = useState<FilterChangeEvent>({});
  const [records, setRecords] = useState<MedicationStatementModel[]>([]);
  const { otherProviderMedications, isLoading } =
    useQueryAllPatientMedications();

  useEffect(() => {
    if (!isLoading && otherProviderMedications) {
      const filteredRecords = otherProviderMedications.filter((medication) => {
        if (filters.providers.selected) {
          return filters.providers.selected === medication.lastPrescriber;
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
  ...otherProviderTableProps
}: PatientMedicationsTabbedProps) {
  const tabItems = tabbedContent(otherProviderTableProps);

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

import cx from "classnames";
import { patientEncounterColumns } from "./columns";
import { defaultEncounterFilters } from "./filters";
import { usePatientEncounterDetailsDrawer } from "./modal-hooks";
import { defaultEncounterSort, encounterSortOptions } from "./sorts";
import { ResourceTable } from "../../resource/resource-table";
import {
  ResourceTableActions,
  ResourceTableActionsProps,
} from "../../resource/resource-table-actions";
import { EmptyTable } from "@/components/core/empty-table";
import { FilterItem } from "@/components/core/filter-bar/filter-bar-types";
import { RowActionsProp } from "@/components/core/table/table-rows";
// import "./patient-encounters.scss";
import { EncounterModel } from "@/fhir/models/encounter";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";

export type PatientEncountersBaseProps = {
  action?: ResourceTableActionsProps<EncounterModel>["action"];
  className?: string;
  query: { data?: EncounterModel[]; isLoading: boolean };
  rowActions?: RowActionsProp<EncounterModel>;
  filters: FilterItem[];
  enableFQS?: boolean;
  onOpenHistoryDrawer?: () => void;
};

export const PatientEncountersBase = ({
  action,
  className,
  query,
  rowActions,
  filters,
  onOpenHistoryDrawer,
}: PatientEncountersBaseProps) => {
  const openDetailsDrawer = usePatientEncounterDetailsDrawer({ RowActions: rowActions });
  const { data, setFilters, setSort } = useFilteredSortedData({
    defaultFilters: defaultEncounterFilters,
    defaultSort: defaultEncounterSort,
    records: query.data,
  });

  const isEmptyQuery = query.data?.length === 0;
  const hasZeroFilteredRecords = !isEmptyQuery && data.length === 0;

  function handleRowClick(encounter: EncounterModel) {
    onOpenHistoryDrawer?.();
    openDetailsDrawer(encounter);
  }

  return (
    <div className={cx("ctw-scrollable-pass-through-height", className)}>
      <ResourceTableActions
        filterOptions={{
          onChange: setFilters,
          defaultState: defaultEncounterFilters,
          filters,
        }}
        sortOptions={{
          defaultSort: defaultEncounterSort,
          options: encounterSortOptions,
          onChange: setSort,
        }}
        action={action}
      />

      <ResourceTable
        className="ctw-patient-encounters"
        columns={patientEncounterColumns}
        data={data}
        emptyMessage={
          <EmptyTable hasZeroFilteredRecords={hasZeroFilteredRecords} resourceName="encounters" />
        }
        isLoading={query.isLoading}
        onRowClick={handleRowClick}
        RowActions={rowActions}
        enableDismissAndReadActions
      />
    </div>
  );
};

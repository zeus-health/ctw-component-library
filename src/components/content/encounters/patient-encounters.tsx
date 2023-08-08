import cx from "classnames";
import { useRef } from "react";
import { patientEncounterColumns } from "./helpers/columns";
import { defaultEncounterFilters, encounterFilters } from "./helpers/filters";
import { usePatientEncounterDetailsDrawer } from "./helpers/modal-hooks";
import { defaultEncounterSort, encounterSortOptions } from "./helpers/sorts";
import { getDateRangeView } from "../resource/helpers/view-date-range";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { ResourceTable } from "@/components/content/resource/resource-table";
import { EmptyTable } from "@/components/core/empty-table";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useUserBuilderId } from "@/components/core/providers/user-builder-id";
import { usePatientEncounters } from "@/fhir/encounters";
import { EncounterModel } from "@/fhir/models/encounter";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";

export type PatientEncountersProps = {
  className?: cx.Argument;
};

function PatientEncountersComponent({ className }: PatientEncountersProps) {
  const userBuilderId = useUserBuilderId();
  const encountersQuery = usePatientEncounters();
  const containerRef = useRef<HTMLDivElement>(null);
  const { viewOptions, allTime } = getDateRangeView<EncounterModel>("periodStart");
  const { data, setFilters, setSort, setViewOption } = useFilteredSortedData({
    defaultView: allTime,
    defaultFilters: defaultEncounterFilters,
    defaultSort: defaultEncounterSort,
    records: encountersQuery.data,
  });

  const isEmptyQuery = encountersQuery.data && encountersQuery.data.length === 0;
  const hasZeroFilteredRecords = !isEmptyQuery && data.length === 0;

  const openEncounterDetails = usePatientEncounterDetailsDrawer({
    enableDismissAndReadActions: true,
  });

  return (
    <div className={cx(className, "ctw-scrollable-pass-through-height")} ref={containerRef}>
      <ResourceTableActions
        viewOptions={{
          onChange: setViewOption,
          options: viewOptions,
          defaultView: allTime,
        }}
        filterOptions={{
          onChange: setFilters,
          defaultState: defaultEncounterFilters,
          filters: encounterFilters(encountersQuery.data),
        }}
        sortOptions={{
          defaultSort: defaultEncounterSort,
          options: encounterSortOptions,
          onChange: setSort,
        }}
      />
      <ResourceTable
        showTableHead
        isLoading={encountersQuery.isLoading}
        columns={patientEncounterColumns(userBuilderId)}
        data={data}
        emptyMessage={
          <EmptyTable hasZeroFilteredRecords={hasZeroFilteredRecords} resourceName="encounters" />
        }
        enableDismissAndReadActions
        onRowClick={openEncounterDetails}
      />
    </div>
  );
}

export const PatientEncounters = withErrorBoundary(PatientEncountersComponent, "PatientEncounters");

import cx from "classnames";
import { useRef } from "react";
import { patientEncounterColumns } from "./helpers/columns";
import { defaultEncounterFilters, encounterFilters } from "./helpers/filters";
import { usePatientEncounterDetailsDrawer } from "./helpers/modal-hooks";
import { defaultEncounterSort, encounterSortOptions } from "./helpers/sorts";
import { getDateRangeView } from "../resource/helpers/view-date-range";
import { PatientResourceTable } from "../resource/patient-resource-table";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { EmptyPatientTable } from "@/components/core/empty-table";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { useAnalytics } from "@/components/core/providers/analytics/use-analytics";
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
  const { trackInteraction } = useAnalytics();

  const openEncounterDetails = usePatientEncounterDetailsDrawer();

  return (
    <AnalyticsProvider componentName="PatientEncounters">
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
        <PatientResourceTable
          showTableHead
          isLoading={encountersQuery.isLoading}
          columns={patientEncounterColumns(userBuilderId)}
          data={data}
          emptyMessage={
            <EmptyPatientTable
              hasZeroFilteredRecords={hasZeroFilteredRecords}
              resourceName="encounters"
              trackInteraction={trackInteraction}
            />
          }
          enableDismissAndReadActions
          onRowClick={openEncounterDetails}
        />
      </div>
    </AnalyticsProvider>
  );
}

export const PatientEncounters = withErrorBoundary(PatientEncountersComponent, "PatientEncounters");

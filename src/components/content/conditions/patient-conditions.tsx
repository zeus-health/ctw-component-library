import cx from "classnames";
import { useRef, useState } from "react";
import { useConditionHistory } from "../condition-history/conditions-history-drawer";
import { filterOtherConditions } from "./helpers";
import { PatientConditionsActions } from "./patient-conditions-actions";
import { patientConditionsColumns } from "./patient-conditions-columns";
import {
  FilterCollection,
  useConditionFilters,
} from "./patient-conditions-filters";
import {
  OtherProviderConditionHoverActions,
  PatientConditionHoverActions,
} from "./patient-conditions-menu-actions";
import { useConditionSorts } from "./patient-conditions-sort";
import { PatientConditionsTabs } from "./patient-conditions-tabs";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { Table } from "@/components/core/table/table";
import {
  useOtherProviderConditions,
  usePatientConditions,
} from "@/fhir/conditions";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import "./patient-conditions.scss";

export type PatientConditionsProps = {
  className?: string;
  readOnly?: boolean;
};

export const PatientConditions = withErrorBoundary(
  ({ className, readOnly = false }: PatientConditionsProps) => {
    // State.
    const [collection, setCollection] = useState<FilterCollection>("patient");
    const { filters, updateFilters, applyFilters } =
      useConditionFilters(collection);
    const { applySorts, sortOptions, updateSorts, currentSorts } =
      useConditionSorts(collection);
    const containerRef = useRef<HTMLDivElement>(null);
    const breakpoints = useBreakpoints(containerRef);

    // Drawer helpers.
    const showConditionHistory = useConditionHistory();

    // Data fetching.
    const patientConditionsQuery = usePatientConditions();
    const otherConditionsQuery = useOtherProviderConditions();

    function isLoading() {
      const isLoadingPatient = patientConditionsQuery.isLoading;
      const isLoadingOther = isLoadingPatient || otherConditionsQuery.isLoading;
      return collection === "patient" ? isLoadingPatient : isLoadingOther;
    }

    // Get our conditions.
    const patientConditions = patientConditionsQuery.data ?? [];
    const otherConditions = filterOtherConditions(
      otherConditionsQuery.data ?? [],
      patientConditions,
      true
    );
    let conditions = applyFilters(patientConditions, otherConditions);
    conditions = applySorts(conditions);
    const RowActions =
      collection === "patient"
        ? PatientConditionHoverActions
        : OtherProviderConditionHoverActions;

    return (
      <div
        ref={containerRef}
        className={cx(
          "ctw-patient-conditions ctw-items-center ctw-justify-between ctw-py-5",
          className,
          {
            "ctw-patient-conditions-stacked": breakpoints.sm,
          }
        )}
      >
        <PatientConditionsTabs
          forceHorizontalTabs
          otherConditions={otherConditions}
          collection={collection}
          onCollectionChange={setCollection}
        />

        <PatientConditionsActions
          sortOptions={sortOptions}
          updateSorts={updateSorts}
          activeCollection={collection}
          hideAdd={readOnly || collection === "other"}
          onToggleShowHistoric={() =>
            updateFilters({ showHistoric: !filters.showHistoric })
          }
          currentSorts={currentSorts[collection]}
        />

        <Table
          stacked={breakpoints.sm}
          className="-ctw-mx-px !ctw-rounded-none"
          showTableHead={false}
          emptyMessage="There are no condition records available."
          isLoading={isLoading()}
          records={conditions}
          RowActions={readOnly ? undefined : RowActions}
          columns={patientConditionsColumns}
          handleRowClick={(condition) =>
            showConditionHistory({
              condition,
              readOnly: readOnly || condition.isSummaryResource,
            })
          }
        />
      </div>
    );
  },
  "PatientConditions"
);

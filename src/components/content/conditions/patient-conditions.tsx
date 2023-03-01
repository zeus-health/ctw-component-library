import cx from "classnames";
import { useRef, useState } from "react";
import { useConditionHistory } from "../condition-history/conditions-history-drawer";
import { conditionFilters } from "./filter-options";
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
  useOtherProviderConditionsDeduped,
  usePatientConditions,
} from "@/fhir/conditions";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import "./patient-conditions.scss";

export type PatientConditionsProps = {
  className?: string;
  readOnly?: boolean;
  hideBuilderOwnedRecords?: boolean;
  hideOutsideOwnedRecords?: boolean;
  hideRequestRecords: boolean;
};

export const PatientConditions = withErrorBoundary(
  ({
    className,
    readOnly = false,
    hideBuilderOwnedRecords = false,
    hideOutsideOwnedRecords = false,
    hideRequestRecords = false,
  }: PatientConditionsProps) => {
    // State.
    const [collection, setCollection] = useState<FilterCollection>(
      hideBuilderOwnedRecords ? "other" : "patient"
    );
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
    const otherConditionsQuery = useOtherProviderConditionsDeduped();

    function isLoading() {
      const isLoadingPatient = patientConditionsQuery.isLoading;
      const isLoadingOther = isLoadingPatient || otherConditionsQuery.isLoading;
      return collection === "patient" ? isLoadingPatient : isLoadingOther;
    }

    // Get our conditions.
    const patientConditions = patientConditionsQuery.data ?? [];
    const otherConditions = otherConditionsQuery.data;

    const conditions = applySorts(
      applyFilters(patientConditions, otherConditions)
    );
    const RowActions =
      collection === "patient"
        ? PatientConditionHoverActions
        : OtherProviderConditionHoverActions;

    return (
      <div
        ref={containerRef}
        className={cx("ctw-patient-conditions ctw-bg-white", className, {
          "ctw-patient-conditions-stacked": breakpoints.sm,
        })}
      >
        {!(hideBuilderOwnedRecords || hideOutsideOwnedRecords) && (
          <PatientConditionsTabs
            forceHorizontalTabs
            collection={collection}
            onCollectionChange={setCollection}
          />
        )}

        <PatientConditionsActions
          sortOptions={sortOptions}
          updateSorts={updateSorts}
          activeCollection={collection}
          hideAdd={readOnly || collection === "other"}
          currentSorts={currentSorts[collection]}
          filterItems={conditionFilters(
            collection === "patient" ? patientConditions : otherConditions
          )}
          setFilters={updateFilters}
          filters={filters[collection]}
          hideRequestRecords={hideRequestRecords}
        />

        <div className="ctw-overflow-hidden">
          <Table
            stacked={breakpoints.sm}
            removeLeftAndRightBorders
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
      </div>
    );
  },
  "PatientConditions"
);

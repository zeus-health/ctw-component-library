import cx from "classnames";
import "./patient-conditions.scss";
import { useRef } from "react";
import { filterOtherConditions } from "./helpers";
import { PatientConditionsActions } from "./patient-conditions-actions";
import { patientConditionsColumns } from "./patient-conditions-columns";
import { useConditionFilters } from "./patient-conditions-filters";
import { PatientConditionsHeader } from "./patient-conditions-header";
import { Table } from "@/components/core/table/table";
import {
  useOtherProviderConditions,
  usePatientConditions,
} from "@/fhir/conditions";
import { useBreakpoints } from "@/hooks/use-breakpoints";

export type PatientConditionsProps = {
  className?: string;
  readOnly?: boolean;
};

export function PatientConditions({
  className,
  readOnly = false,
}: PatientConditionsProps) {
  // State.
  const { filters, updateFilters, applyFilters } = useConditionFilters();
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);

  // Data fetching.
  const patientConditionsQuery = usePatientConditions();
  const otherConditionsQuery = useOtherProviderConditions();

  function isLoading() {
    const isLoadingPatient = patientConditionsQuery.isLoading;
    const isLoadingOther = isLoadingPatient || otherConditionsQuery.isLoading;
    return filters.collection === "patient" ? isLoadingPatient : isLoadingOther;
  }

  // Get our conditions.
  const patientConditions = patientConditionsQuery.data ?? [];
  const otherConditions = filterOtherConditions(
    otherConditionsQuery.data ?? [],
    patientConditions,
    true
  );
  const conditions = applyFilters(patientConditions, otherConditions);

  return (
    <div
      ref={containerRef}
      className={cx("ctw-patient-conditions", className, {
        "ctw-patient-conditions-stacked": breakpoints.sm,
      })}
    >
      <PatientConditionsHeader
        otherConditions={otherConditions}
        collection={filters.collection}
        onCollectionChange={(collection) => updateFilters({ collection })}
      />
      <PatientConditionsActions
        hideAdd={readOnly || filters.collection === "other"}
        onToggleShowHistoric={() =>
          updateFilters({ showHistoric: !filters.showHistoric })
        }
      />
      <Table
        stacked={breakpoints.sm}
        className="-ctw-mx-px !ctw-rounded-none"
        showTableHead={false}
        isLoading={isLoading()}
        records={conditions}
        columns={patientConditionsColumns}
      />
    </div>
  );
}

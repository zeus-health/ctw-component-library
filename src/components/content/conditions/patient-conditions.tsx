import cx from "classnames";
import "./patient-conditions.scss";
import { useRef } from "react";
import { useConditionHistory } from "../condition-history/conditions-history-drawer";
import { filterOtherConditions } from "./helpers";
import { PatientConditionsActions } from "./patient-conditions-actions";
import { patientConditionsColumns } from "./patient-conditions-columns";
import { useConditionFilters } from "./patient-conditions-filters";
import { PatientConditionsHeader } from "./patient-conditions-header";
import {
  OtherProviderConditionHoverActions,
  PatientConditionHoverActions,
} from "./patient-conditions-menu-actions";
import { FormEntry } from "@/components/core/form/drawer-form-with-fields";
import { Table } from "@/components/core/table/table";
import { TelemetryBoundary } from "@/components/core/telemetry-boundary";
import {
  useOtherProviderConditions,
  usePatientConditions,
} from "@/fhir/conditions";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import { AnyZodSchema } from "@/utils/form-helper";

export type PatientConditionsProps = {
  className?: string;
  readOnly?: boolean;
};

export type ConditionFormData = {
  schema: AnyZodSchema;
  actionType: string;
  data: FormEntry[] | undefined;
  drawerIsOpen: boolean;
};

export function PatientConditions({
  className,
  readOnly = false,
}: PatientConditionsProps) {
  // State.
  const { filters, updateFilters, applyFilters } = useConditionFilters();
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
  const RowActions =
    filters.collection === "patient"
      ? PatientConditionHoverActions
      : OtherProviderConditionHoverActions;

  return (
    <TelemetryBoundary>
      <div
        ref={containerRef}
        data-zus-telemetry-namespace="PatientConditions"
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
    </TelemetryBoundary>
  );
}

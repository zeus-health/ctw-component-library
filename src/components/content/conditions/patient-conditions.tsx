import cx from "classnames";
import "./patient-conditions.scss";
import { useRef } from "react";
import { useConditionHistory } from "../condition-history/conditions-history-drawer";
import { filterOtherConditions } from "./helpers";
import { PatientConditionsActions } from "./patient-conditions-actions";
import { patientConditionsColumns } from "./patient-conditions-columns";
import {
  getUnfilteredCollection,
  selectedAndAvailableFilters,
  useConditionFilters,
} from "./patient-conditions-filters";
import {
  OtherProviderConditionHoverActions,
  PatientConditionHoverActions,
} from "./patient-conditions-menu-actions";
import { PatientConditionsTabs } from "./patient-conditions-tabs";
import { FormEntry } from "@/components/core/form/drawer-form-with-fields";
import { Table } from "@/components/core/table/table";
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
  const { filters, updateFilters, applyFilters, updateCollection } =
    useConditionFilters();
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

    return filters.activeCollection === "patient"
      ? isLoadingPatient
      : isLoadingOther;
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
    filters.activeCollection === "patient"
      ? PatientConditionHoverActions
      : OtherProviderConditionHoverActions;

  return (
    <div
      ref={containerRef}
      className={cx("ctw-patient-conditions", className, {
        "ctw-patient-conditions-stacked": breakpoints.sm,
      })}
    >
      <div className="ctw-items-center ctw-justify-between ctw-py-5">
        <div className="ctw-ml-3 ctw-text-xl ctw-font-medium ctw-text-content-black">
          Conditions
        </div>
        <PatientConditionsTabs
          otherConditions={otherConditions}
          collection={filters.activeCollection}
          onCollectionChange={(collection) =>
            updateCollection({ activeCollection: collection })
          }
        />

        <PatientConditionsActions
          hideAdd={readOnly || filters.activeCollection === "other"}
          filters={filters[filters.activeCollection]}
          activeCollection={filters.activeCollection}
          availableFilters={selectedAndAvailableFilters(
            getUnfilteredCollection(
              patientConditions,
              otherConditions,
              filters.activeCollection
            ),
            filters[filters.activeCollection]
          )}
          updateFilters={updateFilters}
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
    </div>
  );
}

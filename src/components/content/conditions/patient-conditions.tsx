import cx from "classnames";
import "./patient-conditions.scss";
import { useRef, useState } from "react";
import { ConditionHistoryDrawer } from "../condition-history/conditions-history-drawer";
import { filterOtherConditions } from "./helpers";
import { PatientConditionsActions } from "./patient-conditions-actions";
import { patientConditionsColumns } from "./patient-conditions-columns";
import { useConditionFilters } from "./patient-conditions-filters";
import { PatientConditionsHeader } from "./patient-conditions-header";
import {
  createHandleEditCondition,
  handleOpeningHistoryDrawer,
} from "./patient-conditions-history";
import {
  OtherProviderConditionHoverActions,
  PatientConditionHoverActions,
} from "./patient-conditions-menu-actions";
import { FormEntry } from "@/components/core/form/drawer-form-with-fields";
import { Table } from "@/components/core/table/table";
import {
  useOtherProviderConditions,
  usePatientConditions,
} from "@/fhir/conditions";
import { ConditionModel } from "@/fhir/models";
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
  const [historyDrawerIsOpen, setHistoryDrawerIsOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState<ConditionModel>();

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
        RowActions={
          filters.collection === "patient"
            ? PatientConditionHoverActions
            : OtherProviderConditionHoverActions
        }
        columns={patientConditionsColumns}
        handleRowClick={(data: ConditionModel) =>
          handleOpeningHistoryDrawer(
            setHistoryDrawerIsOpen,
            setSelectedCondition,
            data
          )
        }
      />

      <ConditionHistoryDrawer
        isOpen={historyDrawerIsOpen}
        onClose={() => setHistoryDrawerIsOpen(false)}
        condition={selectedCondition}
        // TODO
        // This is wrong. Need to only pass in handleEditCondition when showing
        // builder records (not other).
        onEdit={createHandleEditCondition({
          data: selectedCondition,
          patientRecords: patientConditions,
          handleEditCondition: () => {},
        })}
      />
    </div>
  );
}

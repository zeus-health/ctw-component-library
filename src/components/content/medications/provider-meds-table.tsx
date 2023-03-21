import { useEffect, useState } from "react";
import { useMedicationHistory } from "./medication-history-drawer";
import {
  MedicationsTableBase,
  MedsHistoryTempProps,
} from "@/components/content/medications-table-base";
import {
  defaultMedicationSort,
  medicationSortOptions,
} from "@/components/content/medications/patient-medications-sort";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { SortButton } from "@/components/core/sort-button/sort-button";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";
import { get, isFunction, pipe, toLower } from "@/utils/nodash/fp";
import { sort, SortDir } from "@/utils/sort";

export type ProviderMedsTableProps = {
  className?: string;
  showInactive?: boolean;
  sortColumn?: keyof MedicationStatementModel;
  sortOrder?: SortDir;
} & MedsHistoryTempProps;

/**
 * Displays a table of medications that are scoped to the CTWContext builder
 * and patient. To show medications that aren't scoped to the builder, use the
 * `OtherProviderMedsTable` instead.
 *
 * The table has a menu to the right side which will pull out the
 * history for the medication listed in that row.
 */
export const ProviderMedsTable = withErrorBoundary(
  ({
    showInactive = false,
    sortColumn = "display",
    sortOrder = "asc",
    onAfterOpenHistoryDrawer,
    onOpenHistoryDrawer,
  }: ProviderMedsTableProps) => {
    const [medicationModels, setMedicationModels] = useState<
      MedicationStatementModel[]
    >([]);
    const { builderMedications, isLoading } = useQueryAllPatientMedications();
    const openMedHistoryDrawer = useMedicationHistory();
    const { data, setSort } = useFilteredSortedData({
      defaultFilters: {},
      defaultSort: defaultMedicationSort,
      records: builderMedications,
    });

    function openHistoryDrawer(row: MedicationStatementModel) {
      // Temp - onOpen and onAfterOpen should be side-effect free as
      // they may be called after component unmounts. We added
      // this to support a bug-fix workaround in canvas.
      if (isFunction(onOpenHistoryDrawer)) {
        onOpenHistoryDrawer();
      }
      openMedHistoryDrawer({ medication: row });
      setTimeout(() => {
        if (isFunction(onAfterOpenHistoryDrawer)) {
          onAfterOpenHistoryDrawer();
        }
      }, 0);
    }

    useEffect(() => {
      setMedicationModels(
        sort(
          showInactive
            ? data
            : data.filter((bm) => bm.displayStatus === "Active"),
          pipe(get(sortColumn), toLower),
          sortOrder
        )
      );
    }, [data, sortColumn, sortOrder, showInactive]);

    return (
      <div>
        <div className="ctw-flex ctw-flex-wrap ctw-gap-x-2">
          <SortButton
            className="ctw-my-2"
            options={medicationSortOptions}
            onChange={setSort}
            defaultSort={defaultMedicationSort}
          />
        </div>

        <MedicationsTableBase
          medicationStatements={medicationModels}
          telemetryNamespace="ProviderMedsTable"
          isLoading={isLoading}
          handleRowClick={openHistoryDrawer}
        />
      </div>
    );
  },
  "ProviderMedsTable"
);

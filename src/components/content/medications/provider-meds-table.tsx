import { useEffect, useState } from "react";
import { useMedicationHistory } from "./medication-history-drawer";
import {
  MedicationsTableBase,
  MedsHistoryTempProps,
} from "@/components/content/medications-table-base";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";
import { get, isFunction, pipe, toLower } from "@/utils/nodash/fp";
import { sort, SortDir } from "@/utils/sort";

export type ProviderMedsTableProps = {
  className?: string;
  sortColumn?: keyof MedicationStatementModel;
  sortOrder?: SortDir;
  // should inactive meds be shown?
  showInactive?: boolean;
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
      if (!builderMedications) return;
      setMedicationModels(
        sort(
          showInactive
            ? builderMedications
            : builderMedications.filter((bm) => bm.displayStatus === "Active"),
          pipe(get(sortColumn), toLower),
          sortOrder
        )
      );
    }, [builderMedications, sortColumn, sortOrder, showInactive]);

    return (
      <>
        <MedicationsTableBase
          medicationStatements={medicationModels}
          telemetryNamespace="ProviderMedsTable"
          isLoading={isLoading}
          handleRowClick={openHistoryDrawer}
        />
      </>
    );
  },
  "ProviderMedsTable"
);

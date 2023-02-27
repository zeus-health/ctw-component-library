import { useEffect, useState } from "react";
import { useMedicationHistory } from "./medication-history-drawer";
import {
  MedicationsTableBase,
  MedsHistoryTempProps,
} from "@/components/content/medications-table-base";
import { AddNewMedDrawer } from "@/components/content/medications/add-new-med-drawer";
import { Badge } from "@/components/core/badge";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useDismissMedication } from "@/fhir/medications";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";
import { get, isFunction, pipe, toLower } from "@/utils/nodash/fp";
import { sort, SortDir } from "@/utils/sort";

export type OtherProviderMedsTableProps = {
  className?: string;
  handleAddToRecord?: (m: MedicationStatementModel) => void;
  hideAddToRecord?: boolean;
  showDismissed?: boolean;
  showInactive?: boolean;
  sortColumn?: keyof MedicationStatementModel;
  sortOrder?: SortDir;
  records?: MedicationStatementModel[];
} & MedsHistoryTempProps;

/**
 * Displays a table of medications that are not scoped to the current builder.
 * This component displays the inverse results of `ProviderMedsTable`.
 *
 * The table has a menu to the right side which will pull out the
 * history for the medication listed in that row.
 */
export const OtherProviderMedsTable = withErrorBoundary(
  ({
    sortOrder = "asc",
    sortColumn = "display",
    showDismissed = false,
    showInactive = false,
    hideAddToRecord = false,
    handleAddToRecord,
    records,
    onAfterOpenHistoryDrawer,
    onOpenHistoryDrawer,
  }: OtherProviderMedsTableProps) => {
    const dismissMedication = useDismissMedication();
    const openMedHistoryDrawer = useMedicationHistory();
    const [medicationModels, setMedicationModels] = useState<
      MedicationStatementModel[]
    >([]);
    const [addNewMedDrawerOpen, setAddNewMedDrawerOpen] = useState(false);
    const [hasZeroRowActions, setHasZeroRowActions] = useState(false);
    const [selectedMedication, setSelectedMedication] =
      useState<MedicationStatementModel>();
    const { otherProviderMedications, isLoading } =
      useQueryAllPatientMedications();

    function openHistoryDrawer(row: MedicationStatementModel) {
      // Temp - onOpen and onAfterOpen should be side-effect free as
      // they may be called after component unmounts. We added
      // this to support a bug-fix workaround in canvas.
      if (isFunction(onOpenHistoryDrawer)) {
        onOpenHistoryDrawer();
      }
      setSelectedMedication(row);
      openMedHistoryDrawer({ medication: row });
      setTimeout(() => {
        if (isFunction(onAfterOpenHistoryDrawer)) {
          onAfterOpenHistoryDrawer();
        }
      }, 0);
    }

    function openAddNewMedicationDrawer(row: MedicationStatementModel) {
      setSelectedMedication(row);
      setAddNewMedDrawerOpen(true);
    }

    useEffect(() => {
      const theRecords = records || otherProviderMedications;
      if (!theRecords) return;
      const filteredRecords = theRecords
        .filter((med) => !med.isArchived || showDismissed)
        .filter((med) => !med.isInactive || showInactive);

      const allRecordsHaveBeenDismissed = filteredRecords.every(
        (record) => record.isArchived
      );
      setMedicationModels(
        sort(filteredRecords, pipe(get(sortColumn), toLower), sortOrder)
      );
      setHasZeroRowActions(hideAddToRecord && allRecordsHaveBeenDismissed);
    }, [
      otherProviderMedications,
      sortColumn,
      sortOrder,
      showInactive,
      showDismissed,
      records,
      hideAddToRecord,
    ]);

    return (
      <div data-zus-telemetry-namespace="OtherProviderMedsTable">
        <MedicationsTableBase
          removeLeftAndRightBorders
          getRowClassName={(medication) => ({
            "ctw-tr-archived": medication.isArchived,
          })}
          emptyMessage="No records found."
          telemetryNamespace="MedicationsTableBase"
          medicationStatements={medicationModels}
          isLoading={isLoading}
          handleRowClick={openHistoryDrawer}
          RowActions={
            hasZeroRowActions
              ? undefined
              : ({ record }) => (
                  <div
                    onClick={(event) => event.stopPropagation()}
                    onKeyDown={(event) => event.stopPropagation()}
                  >
                    {!record.isArchived && (
                      <button
                        type="button"
                        className="ctw-btn-primary ctw-capitalize"
                        data-zus-telemetry-click="Dismiss record"
                        onClick={async () => {
                          await dismissMedication(record);
                        }}
                      >
                        dismiss
                      </button>
                    )}
                    {!hideAddToRecord && (
                      <button
                        type="button"
                        className="ctw-btn-primary ctw-ml-1 ctw-capitalize"
                        data-zus-telemetry-click="Add to record"
                        data-testid="add-to-record"
                        onClick={() => {
                          if (handleAddToRecord) {
                            handleAddToRecord(record);
                          } else {
                            openAddNewMedicationDrawer(record);
                          }
                        }}
                      >
                        add to record
                      </button>
                    )}
                  </div>
                )
          }
        />
        <AddNewMedDrawer
          medication={selectedMedication?.resource}
          isOpen={addNewMedDrawerOpen}
          handleOnClose={() => setAddNewMedDrawerOpen(false)}
        />
      </div>
    );
  },
  "OtherProviderMedsTable"
);

export const BadgeOtherProviderMedCount = () => {
  const { otherProviderMedications = [] } = useQueryAllPatientMedications();
  const activeUnarchivedMedications = otherProviderMedications.filter(
    (medication) => !(medication.isArchived || medication.isInactive)
  );

  if (activeUnarchivedMedications.length > 0) {
    return (
      <Badge
        color="notification"
        text={activeUnarchivedMedications.length.toString()}
        className="ctw-h-5"
      />
    );
  }
  return null;
};

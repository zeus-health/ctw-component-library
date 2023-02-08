import { useEffect, useState } from "react";
import { MedicationDrawer } from "@/components/content/medication-drawer";
import { MedicationsTableBase } from "@/components/content/medications-table-base";
import { AddNewMedDrawer } from "@/components/content/medications/add-new-med-drawer";
import { Badge } from "@/components/core/badge";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useDismissMedication } from "@/fhir/medications";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";
import { get, pipe, toLower } from "@/utils/nodash/fp";
import { sort, SortDir } from "@/utils/sort";

export type OtherProviderMedsTableProps = {
  className?: string;
  handleAddToRecord?: (m: MedicationStatementModel) => void;
  showDismissed?: boolean;
  showInactive?: boolean;
  sortColumn?: keyof MedicationStatementModel;
  sortOrder?: SortDir;
  records?: MedicationStatementModel[];
};

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
    handleAddToRecord,
    records,
  }: OtherProviderMedsTableProps) => {
    const [overrideState, setOverrideState] = useState(!!records);
    const dismissMedication = useDismissMedication();
    const [medicationModels, setMedicationModels] = useState<
      MedicationStatementModel[]
    >([]);
    const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);
    const [addNewMedDrawerOpen, setAddNewMedDrawerOpen] = useState(false);
    const [selectedMedication, setSelectedMedication] =
      useState<MedicationStatementModel>();
    const { otherProviderMedications, isLoading } =
      useQueryAllPatientMedications();

    function openHistoryDrawer(row: MedicationStatementModel) {
      setSelectedMedication(row);
      setHistoryDrawerOpen(true);
    }

    function openAddNewMedicationDrawer(row: MedicationStatementModel) {
      setSelectedMedication(row);
      setAddNewMedDrawerOpen(true);
    }

    useEffect(() => {
      const theRecords = records || otherProviderMedications;
      if (!theRecords) return;
      setMedicationModels(
        sort(
          theRecords
            .filter((med) => !med.isArchived || showDismissed)
            .filter((med) => !med.isInactive || showInactive),
          pipe(get(sortColumn), toLower),
          sortOrder
        )
      );
    }, [
      otherProviderMedications,
      sortColumn,
      sortOrder,
      showInactive,
      showDismissed,
      records,
    ]);

    return (
      <div data-zus-telemetry-namespace="OtherProviderMedsTable">
        <MedicationsTableBase
          getRowClassName={(medication) => ({
            "ctw-tr-archived": medication.isArchived,
          })}
          emptyMessage="No records found."
          telemetryNamespace="MedicationsTableBase"
          medicationStatements={medicationModels}
          isLoading={isLoading}
          handleRowClick={openHistoryDrawer}
          RowActions={({ record }) => (
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
            </div>
          )}
        />
        <MedicationDrawer
          medication={selectedMedication}
          isOpen={historyDrawerOpen}
          onClose={() => setHistoryDrawerOpen(false)}
          onDismissal={dismissMedication}
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

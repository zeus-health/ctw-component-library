import { useEffect, useState } from "react";
import { MedicationDrawer } from "@/components/content/medication-drawer";
import { MedicationsTableBase } from "@/components/content/medications-table-base";
import { AddNewMedDrawer } from "@/components/content/medications/add-new-med-drawer";
import { TelemetryErrorBoundary } from "@/components/core/telemetry-boundary";
import { useDismissMedication } from "@/fhir/medications";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";
import { compact, get, pipe, toLower } from "@/utils/nodash/fp";
import { sort, SortDir } from "@/utils/sort";

export type OtherProviderMedsTableProps = {
  className?: string;
  sortColumn?: keyof MedicationStatementModel;
  sortOrder?: SortDir;
};

/**
 * Displays a table of medications that are not scoped to the current builder.
 * This component displays the inverse results of `ProviderMedsTable`.
 *
 * The table has a menu to the right side which will pull out the
 * history for the medication listed in that row.
 */
export function OtherProviderMedsTable({
  sortOrder = "asc",
  sortColumn = "display",
}: OtherProviderMedsTableProps) {
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
    if (!otherProviderMedications) return;
    setMedicationModels(
      sort(otherProviderMedications, pipe(get(sortColumn), toLower), sortOrder)
    );
  }, [otherProviderMedications, sortColumn, sortOrder]);

  return (
    <TelemetryErrorBoundary name="OtherProviderMedsTable">
      <div data-zus-telemetry-namespace="OtherProviderMedsTable">
        <MedicationsTableBase
          telemetryNamespace="MedicationsTableBase"
          medicationStatements={medicationModels}
          isLoading={isLoading}
          rowMenuActions={(medication) =>
            compact([
              {
                name: "View History",
                action: async () => {
                  openHistoryDrawer(medication);
                },
              },
              {
                name: "Add to Record",
                action: async () => {
                  openAddNewMedicationDrawer(medication);
                },
              },
              medication.isArchived
                ? null
                : {
                    name: "Dismiss",
                    action: async () => {
                      await dismissMedication(medication);
                    },
                  },
            ])
          }
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
    </TelemetryErrorBoundary>
  );
}

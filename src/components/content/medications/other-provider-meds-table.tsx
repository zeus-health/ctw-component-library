import { get, pipe, toLower } from "lodash/fp";
import { useEffect, useState } from "react";
import { MedicationDrawer } from "@/components/content/medication-drawer";
import { MedicationsTableBase } from "@/components/content/medications-table-base";
import { AddNewMedDrawer } from "@/components/content/medications/add-new-med-drawer";
import { handleToggleDismissal } from "@/components/content/medications/medication-actions";
import { useCTW } from "@/components/core/ctw-provider";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";
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
  const { getRequestContext } = useCTW();
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
    <>
      <MedicationsTableBase
        medicationStatements={medicationModels}
        isLoading={isLoading}
        rowMenuActions={(medication) => [
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
          {
            // Dismissed records might not be included in table, but if they
            // are included, we should be able to un-dismiss (retain) them.
            name: medication.isDismissed ? "Retain Record" : "Dismiss Record",
            action: async () => {
              await handleToggleDismissal(medication, getRequestContext);
            },
          },
        ]}
      />
      <MedicationDrawer
        medication={selectedMedication}
        isOpen={historyDrawerOpen}
        onClose={() => setHistoryDrawerOpen(false)}
      />
      <AddNewMedDrawer
        medication={selectedMedication?.resource}
        isOpen={addNewMedDrawerOpen}
        handleOnClose={() => setAddNewMedDrawerOpen(false)}
      />
    </>
  );
}

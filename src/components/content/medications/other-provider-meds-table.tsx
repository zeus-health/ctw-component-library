import { compact, get, pipe, toLower } from "lodash/fp";
import { useEffect, useState } from "react";
import { MedicationDrawer } from "@/components/content/medication-drawer";
import { MedicationsTableBase } from "@/components/content/medications-table-base";
import { AddNewMedDrawer } from "@/components/content/medications/add-new-med-drawer";
import { handleMedicationDismissal } from "@/components/content/medications/medication-actions";
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
            medication.isDismissed
              ? null
              : {
                  name: "Dismiss",
                  action: async () => {
                    await handleMedicationDismissal(
                      medication,
                      getRequestContext
                    );
                  },
                },
          ])
        }
      />
      <MedicationDrawer
        medication={selectedMedication}
        isOpen={historyDrawerOpen}
        onClose={() => setHistoryDrawerOpen(false)}
        onDismissal={async (medication: MedicationStatementModel) => {
          await handleMedicationDismissal(medication, getRequestContext);
        }}
      />
      <AddNewMedDrawer
        medication={selectedMedication?.resource}
        isOpen={addNewMedDrawerOpen}
        handleOnClose={() => setAddNewMedDrawerOpen(false)}
      />
    </>
  );
}

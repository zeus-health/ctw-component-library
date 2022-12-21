import { get, pipe, toLower } from "lodash/fp";
import { useEffect, useState } from "react";
import { MedicationDrawer } from "@/components/content/medication-drawer";
import { MedicationsTableBase } from "@/components/content/medications-table-base";
import { AddNewMedDrawer } from "@/components/content/medications/add-new-med-drawer";
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
  const [medicationModels, setMedicationModels] = useState<
    MedicationStatementModel[]
  >([]);
  const [medDrawerOpen, setMedicationDrawerOpen] = useState(false);
  const [addNewMedDrawerOpen, setAddNewMedDrawerOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] =
    useState<MedicationStatementModel>();
  const { otherProviderMedications, isLoading } =
    useQueryAllPatientMedications();

  function openMedicationDrawer(row: MedicationStatementModel) {
    setSelectedMedication(row);
    setMedicationDrawerOpen(true);
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
              openMedicationDrawer(medication);
            },
          },
          {
            name: "Add to Record",
            action: async () => {
              openAddNewMedicationDrawer(medication);
            },
          },
        ]}
      />
      <MedicationDrawer
        medication={selectedMedication}
        isOpen={medDrawerOpen}
        onClose={() => setMedicationDrawerOpen(false)}
      />
      <AddNewMedDrawer
        medication={selectedMedication?.resource}
        isOpen={addNewMedDrawerOpen}
        handleOnClose={() => setAddNewMedDrawerOpen(false)}
      />
    </>
  );
}

import { get, pipe, toLower } from "lodash/fp";
import { useEffect, useState } from "react";
import { MedicationDrawer } from "@/components/content/medication-drawer";
import { MedicationsTableBase } from "@/components/content/medications-table-base";
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] =
    useState<MedicationStatementModel>();
  const { otherProviderMedications, isLoading } =
    useQueryAllPatientMedications();

  function openMedicationDrawer(row: MedicationStatementModel) {
    setSelectedMedication(row);
    setDrawerOpen(true);
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
        rowActions={(medication) => [
          {
            name: "View History",
            action: () => {
              openMedicationDrawer(medication);
            },
          },
        ]}
      />
      <MedicationDrawer
        medication={selectedMedication}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}

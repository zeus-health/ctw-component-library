import { get, pipe, toLower } from "lodash/fp";
import { useEffect, useState } from "react";
import { MedicationDrawer } from "@/components/content/medication-drawer";
import { MedicationsTableBase } from "@/components/content/medications-table-base";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";
import { sort, SortDir } from "@/utils/sort";

export type ProviderMedsTableProps = {
  className?: string;
  sortColumn?: keyof MedicationStatementModel;
  sortOrder?: SortDir;
  // should inactive meds be shown?
  showInactive?: boolean;
};

/**
 * Displays a table of medications that are scoped to the CTWContext builder
 * and patient. To show medications that aren't scoped to the builder, use the
 * `OtherProviderMedsTable` instead.
 *
 * The table has a menu to the right side which will pull out the
 * history for the medication listed in that row.
 */
export function ProviderMedsTable({
  showInactive = false,
  sortColumn = "display",
  sortOrder = "asc",
}: ProviderMedsTableProps) {
  const [medicationModels, setMedicationModels] = useState<
    MedicationStatementModel[]
  >([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] =
    useState<MedicationStatementModel>();
  const { builderMedications, isLoading } = useQueryAllPatientMedications();

  function openMedicationDrawer(row: MedicationStatementModel) {
    setSelectedMedication(row);
    setDrawerOpen(true);
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
        isLoading={isLoading}
        rowMenuActions={(medication) => [
          {
            name: "View History",
            action: async () => {
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

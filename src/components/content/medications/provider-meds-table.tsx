import { get } from "lodash/fp";
import { useEffect, useState } from "react";
import { MedicationsTableBase } from "@/components/content/medications-table-base";
import { useQueryAllPatientMedicationsByStatus } from "@/hooks/use-medications";
import { MedicationStatementModel } from "@/models/medication-statement";
import { sort } from "@/utils/sort";
import { MedicationDrawer } from "@/components/content/medication-drawer";

type ProviderMedsTableProps = {
  className?: string;
  sortColumn?: keyof MedicationStatementModel;
  sortOrder?: "asc" | "desc";
  // should inactive meds be shown?
  showInactive?: boolean;
};

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
  const { builderMedications, isLoading } =
    useQueryAllPatientMedicationsByStatus(showInactive ? "all" : "active");

  function openMedicationDrawer(row: MedicationStatementModel) {
    setSelectedMedication(row);
    setDrawerOpen(true);
  }

  useEffect(() => {
    if (!builderMedications) return;
    setMedicationModels(sort(builderMedications, get(sortColumn), sortOrder));
  }, [builderMedications, sortColumn, sortOrder]);

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

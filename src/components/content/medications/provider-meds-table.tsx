import { MedicationDrawer } from "@/components/content/medication-drawer";
import { MedicationsTableBase } from "@/components/content/medications-table-base";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";
import { sort } from "@/utils/sort";
import { get } from "lodash/fp";
import { useEffect, useState } from "react";

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
          : builderMedications.filter((bm) => bm.status === "Active"),
        get(sortColumn),
        sortOrder
      )
    );
  }, [builderMedications, sortColumn, sortOrder, showInactive]);

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

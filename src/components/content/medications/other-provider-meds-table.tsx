import { MedicationDrawer } from "@/components/content/medication-drawer";
import { MedicationsTableBase } from "@/components/content/medications-table-base";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";
import { sort } from "@/utils/sort";
import { get } from "lodash/fp";
import { useEffect, useState } from "react";

type OtherProviderMedsTableProps = {
  className?: string;
  sortColumn?: keyof MedicationStatementModel;
  sortOrder?: "asc" | "desc";
};

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
      sort(otherProviderMedications, get(sortColumn), sortOrder)
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

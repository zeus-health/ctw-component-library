import { useEffect, useState } from "react";
import { MedicationDrawer } from "@/components/content/medication-drawer";
import { MedicationsTableBase } from "@/components/content/medications-table-base";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";
import { get, pipe, toLower } from "@/utils/nodash/fp";
import { sort } from "@/utils/sort";

export type InactiveMedRecordsTableProps = {
  className?: string;
};

/**
 * Displays a table of inactive medication records. These are builder-owned medications
 * that have a status other than "active". These are not to be confused with "dismissed" or "archived"
 * medication records pulled from the network of other providers.
 */
export function ProviderInactiveMedicationsTable({
  className,
}: InactiveMedRecordsTableProps) {
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
        builderMedications.filter((bm) => bm.displayStatus !== "Active"),
        pipe(get("display"), toLower),
        "asc"
      )
    );
  }, [builderMedications]);

  return (
    <>
      <MedicationsTableBase
        className={className}
        medicationStatements={medicationModels}
        isLoading={isLoading}
        handleRowClick={(medication) => openMedicationDrawer(medication)}
      />
      <MedicationDrawer
        medication={selectedMedication}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}

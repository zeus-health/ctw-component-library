import { get } from "lodash/fp";
import { useEffect, useState } from "react";
import { MedicationsTableBase } from "@/components/content/medications-table-base";
import { useQueryAllPatientMedicationsByStatus } from "@/hooks/use-medications";
import { MedicationStatementModel } from "@/models/medication-statement";
import { sort } from "@/utils/sort";

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
  const { builderMedications, isLoading } =
    useQueryAllPatientMedicationsByStatus(showInactive ? "all" : "active");

  useEffect(() => {
    if (!builderMedications) return;
    setMedicationModels(sort(builderMedications, get(sortColumn), sortOrder));
  }, [builderMedications, sortColumn, sortOrder]);

  return (
    <MedicationsTableBase
      medicationStatements={medicationModels}
      isLoading={isLoading}
    />
  );
}

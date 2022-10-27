import { get } from "lodash/fp";
import { useEffect, useState } from "react";
import { MedicationsTableBase } from "@/components/content/medications-table-base";
import { useQueryAllPatientMedicationsByStatus } from "@/hooks/use-medications";
import { MedicationStatementModel } from "@/models/medication-statement";
import { sort } from "@/utils/sort";

type OtherProviderMedsTableProps = {
  className?: string;
  sortColumn?: keyof MedicationStatementModel;
  sortOrder?: "asc" | "desc";
  // should inactive meds be shown?
  showInactive?: boolean;
};

export function OtherProviderMedsTable({
  showInactive = false,
  sortOrder = "asc",
  sortColumn = "display",
}: OtherProviderMedsTableProps) {
  const [medicationModels, setMedicationModels] = useState<
    MedicationStatementModel[]
  >([]);
  const { otherProviderMedications } = useQueryAllPatientMedicationsByStatus(
    showInactive ? "all" : "active"
  );

  useEffect(() => {
    if (!otherProviderMedications) return;
    setMedicationModels(
      sort(otherProviderMedications, get(sortColumn), sortOrder)
    );
  }, [otherProviderMedications, sortColumn, sortOrder]);

  return <MedicationsTableBase medicationStatements={medicationModels} />;
}

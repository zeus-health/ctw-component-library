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
  const {
    otherProviderMedications,
    includedResources,
    lensActiveRxNorms,
    builderPatientRxNormStatuses,
  } = useQueryAllPatientMedicationsByStatus(showInactive ? "all" : "active");

  useEffect(() => {
    if (!otherProviderMedications) return;

    const medications = otherProviderMedications.map(
      (medication) =>
        new MedicationStatementModel(
          medication,
          includedResources,
          lensActiveRxNorms,
          builderPatientRxNormStatuses
        )
    );

    setMedicationModels(sort(medications, get(sortColumn), sortOrder));
  }, [
    builderPatientRxNormStatuses,
    includedResources,
    lensActiveRxNorms,
    otherProviderMedications,
    showInactive,
    sortColumn,
    sortOrder,
  ]);

  return <MedicationsTableBase medicationStatements={medicationModels} />;
}

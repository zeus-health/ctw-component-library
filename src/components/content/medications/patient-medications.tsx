import { medicationFilters } from "./helpers/filters";
import { PatientMedicationsBase } from "./helpers/patient-medications-base";
import { defaultMedicationView, medicationViews } from "./helpers/views";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";

export type PatientMedicationsProps = {
  className?: string;
  onOpenHistoryDrawer?: () => void;
  enableFQS?: boolean;
};

const PatientMedicationsComponent = ({
  className,
  onOpenHistoryDrawer,
}: PatientMedicationsProps) => {
  const { builderMedications, isLoading } = useQueryAllPatientMedications();

  return (
    <PatientMedicationsBase
      className={className}
      query={{ data: builderMedications, isLoading }}
      filters={medicationFilters(builderMedications, false)}
      views={medicationViews}
      defaultView={defaultMedicationView}
      onOpenHistoryDrawer={onOpenHistoryDrawer}
    />
  );
};

export const PatientMedications = withErrorBoundary(
  PatientMedicationsComponent,
  "PatientMedications"
);

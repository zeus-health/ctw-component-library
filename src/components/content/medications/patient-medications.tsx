import { PatientMedicationsBase } from "./helpers/patient-medications-base";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";
import { medicationFilters } from "./helpers/filters";
import { defaultMedicationView, medicationViews } from "./helpers/views";

export type PatientMedicationsProps = {
  className?: string;
  readOnly?: boolean;
};

const PatientMedicationsComponent = ({
  className,
  readOnly = false,
}: PatientMedicationsProps) => {
  const { builderMedications, isLoading } = useQueryAllPatientMedications();

  return (
    <PatientMedicationsBase
      className={className}
      query={{ data: builderMedications, isLoading }}
      filters={medicationFilters(builderMedications ?? [], false)}
      views={medicationViews}
      defaultView={defaultMedicationView}
    />
  );
};

export const PatientMedications = withErrorBoundary(
  PatientMedicationsComponent,
  "PatientMedications"
);

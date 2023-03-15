import { PatientMedicationsBase } from "./helpers/patient-medications-base";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";

export type PatientMedicationsProps = {
  className?: string;
  readOnly?: boolean;
};

const PatientMedicationsComponent = ({
  className,
  readOnly = false,
}: PatientMedicationsProps) => {
  const { builderMedications, isLoading } = useQueryAllPatientMedications();
  // const showAddConditionForm = useAddConditionForm();

  return (
    <PatientMedicationsBase
      className={className}
      query={{ data: builderMedications, isLoading }}
      readOnly={readOnly}
    />
  );
};

export const PatientMedications = withErrorBoundary(
  PatientMedicationsComponent,
  "PatientMedications"
);

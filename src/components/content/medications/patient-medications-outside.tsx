import { PatientMedicationsBase } from "./helpers/patient-medications-base";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";

export type PatientMedicationsOutsideProps = {
  className?: string;
  readOnly?: boolean;
};

const PatientMedicationsOutsideComponent = ({
  className,
  readOnly = false,
}: PatientMedicationsOutsideProps) => {
  const { otherProviderMedications, isLoading } =
    useQueryAllPatientMedications();
  // const showAddConditionForm = useAddConditionForm();

  return (
    <PatientMedicationsBase
      className={className}
      query={{ data: otherProviderMedications, isLoading }}
      readOnly={readOnly}
    />
  );
};

export const PatientMedicationsOutside = withErrorBoundary(
  PatientMedicationsOutsideComponent,
  "PatientMedicationsOutside"
);

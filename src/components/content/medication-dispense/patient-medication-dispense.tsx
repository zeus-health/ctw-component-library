import cx from "classnames";
import { patientMedicationDispenseColumns } from "./helpers/dispense-columns";
import { PatientResourceTable } from "../resource/patient-resource-table";
import { EmptyPatientTable } from "@/components/core/empty-table";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { usePatientMedicationDispense } from "@/fhir/medication-dispense";

export type PatientMedDispenseProps = {
  className?: cx.Argument;
};

function PatientMedDispenseComponent({ className }: PatientMedDispenseProps) {
  const patientMedicationDispenseQuery = usePatientMedicationDispense();

  const hasZeroFilteredRecords = patientMedicationDispenseQuery.data?.length === 0;

  return (
    <div className={cx(className, "ctw-scrollable-pass-through-height")}>
      <PatientResourceTable
        showTableHead
        isLoading={patientMedicationDispenseQuery.isLoading}
        data={patientMedicationDispenseQuery.data ?? []}
        columns={patientMedicationDispenseColumns()}
        emptyMessage={
          <EmptyPatientTable
            hasZeroFilteredRecords={hasZeroFilteredRecords}
            resourceName="medicationdispense"
          />
        }
      />
    </div>
  );
}

export const PatientMedicationDispense = withErrorBoundary(
  PatientMedDispenseComponent,
  "PatientMedicationDispense"
);

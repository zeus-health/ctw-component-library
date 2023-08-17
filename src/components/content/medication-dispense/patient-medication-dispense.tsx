import cx from "classnames";
import { patientMedicationDispenseColumns } from "./helpers/dispense-columns";
import { ResourceTable } from "../resource/resource-table";
import { EmptyTable } from "@/components/core/empty-table";
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
      <ResourceTable
        showTableHead
        isLoading={patientMedicationDispenseQuery.isLoading}
        data={patientMedicationDispenseQuery.data ?? []}
        columns={patientMedicationDispenseColumns()}
        emptyMessage={
          <EmptyTable
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

import { useImmunizationDetailsDrawer } from "./immunizations-details-drawer";
import { patientImmunizationsColumns } from "./patient-immunizations-columns";
import { Table } from "@/components/core/table/table";
import { usePatientImmunizations } from "@/fhir/immunizations";
import { ImmunizationModel } from "@/fhir/models/immunization";

export type PatientImmunizationsProps = {
  className?: string;
};

export function PatientImmunizations({ className }: PatientImmunizationsProps) {
  const patientImmunizationsQuery = usePatientImmunizations();
  const openDetails = useImmunizationDetailsDrawer();

  function handleRowClick(immunization: ImmunizationModel) {
    openDetails(immunization);
  }

  return (
    <div className={className}>
      <Table
        className="-ctw-mx-px !ctw-rounded-none"
        showTableHead={false}
        isLoading={patientImmunizationsQuery.isLoading}
        records={patientImmunizationsQuery.data ?? []}
        columns={patientImmunizationsColumns}
        handleRowClick={handleRowClick}
      />
    </div>
  );
}

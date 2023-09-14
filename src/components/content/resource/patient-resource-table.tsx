import { ResourceTable, ResourceTableProps } from "./resource-table";
import { AuthError } from "@/components/core/auth-error";
import { usePatient } from "@/components/core/providers/patient-provider";
import { FHIRModel } from "@/fhir/models/fhir-model";
import "./resource-table.scss";

export const PatientResourceTable = <T extends fhir4.Resource, M extends FHIRModel<T>>({
  className,
  columns,
  data,
  emptyMessage,
  isLoading = false,
  onRowClick,
  RowActions,
  showTableHead,
  enableDismissAndReadActions,
  hidePagination = false,
}: ResourceTableProps<M>) => {
  const patient = usePatient();

  // Use correct empty message when there are auth errors or failure fetching patient data.
  let emptyMessage2 = emptyMessage;
  if (
    patient.error &&
    typeof patient.error === "object" &&
    "status" in patient.error &&
    patient.error.status === 401
  ) {
    emptyMessage2 = <AuthError />;
  } else if (!patient.data) {
    emptyMessage2 = <div className="ctw-space-y-4">Patient not found.</div>;
  }

  // We're loading, if our patient is loading OR
  // if we have our patient data but the passed in isLoading is true.
  // We have to check for patient.data because most queries are only
  // enabled when we have a patient UPID, without one, those queries
  // will stay in the loading state forever.
  const isLoading2 = patient.isLoading || (!!patient.data && isLoading);

  return (
    <ResourceTable
      className={className}
      columns={columns}
      data={data}
      emptyMessage={emptyMessage2}
      isLoading={isLoading2}
      onRowClick={onRowClick}
      RowActions={RowActions}
      showTableHead={showTableHead}
      enableDismissAndReadActions={enableDismissAndReadActions}
      hidePagination={hidePagination}
    />
  );
};

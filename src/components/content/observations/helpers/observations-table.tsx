import { ObservationsColumns } from "./columns";
import { PatientResourceTable } from "../../resource/patient-resource-table";
import { ObservationModel } from "@/fhir/models";

export type ObservationsTableProps = {
  className?: string;
  data: ObservationModel[];
};

export const ObservationsTable = ({ className, data }: ObservationsTableProps) => (
  <div className={className}>
    <div className="ctw-text-base ctw-font-medium ctw-uppercase ctw-text-content-black">
      Results
    </div>
    <PatientResourceTable
      className="ctw-patient-observation-details"
      columns={ObservationsColumns()}
      data={data}
      emptyMessage="There are no observations available."
      hidePagination
    />
  </div>
);

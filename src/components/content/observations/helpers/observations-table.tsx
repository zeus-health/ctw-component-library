import { ObservationsColumns } from "./columns";
import { ResourceTable } from "../../resource/resource-table";
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
    <ResourceTable
      className="ctw-patient-observation-details"
      columns={ObservationsColumns()}
      data={data}
      isLoading={false}
      emptyMessage="There are no observations available."
      hidePagination
    />
  </div>
);

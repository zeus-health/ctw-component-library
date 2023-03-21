import { ResourceTable } from "../../resource/resource-table";
import { observationsColumns } from "@/components/content/observations/helpers/columns";
import { ObservationModel } from "@/fhir/models";

export type ObservationsTableProps = {
  className?: string;
  data: ObservationModel[];
};

export const ObservationsTable = ({
  className,
  data,
}: ObservationsTableProps) => (
  <div className={className}>
    <div className="ctw-text-base ctw-font-medium ctw-uppercase ctw-text-content-light">
      observations
    </div>
    <ResourceTable
      className="ctw-patient-observation-details"
      columns={observationsColumns}
      data={data}
      isLoading={false}
      emptyMessage="There are no observations available."
    />
  </div>
);

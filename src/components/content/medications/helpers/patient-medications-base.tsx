import {
  ResourceTable,
  ResourceTableProps,
} from "../../resource/resource-table";
import {
  ResourceTableActions,
  ResourceTableActionsProps,
} from "../../resource/resource-table-actions";
import { useMedicationHistory } from "../history/medication-history-drawer";
import { patientMedicationColumns } from "./columns";
import { defaultMedicationFilters, medicationFilters } from "./filters";
import { defaultMedicationSort, medicationSortOptions } from "./sorts";
import { MedicationStatementModel } from "@/fhir/models";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import "./patient-medications.scss";

export type PatientMedicationsTableProps = {
  action?: ResourceTableActionsProps<MedicationStatementModel>["action"];
  className?: string;
  query: { data?: MedicationStatementModel[]; isLoading: boolean };
  outside?: boolean;
  readOnly?: boolean;
  rowActions?: ResourceTableProps<MedicationStatementModel>["rowActions"];
};

export const PatientMedicationsBase = ({
  action,
  className,
  query,
  outside = false,
  readOnly = false,
  rowActions,
}: PatientMedicationsTableProps) => {
  const showMedicationHistory = useMedicationHistory();
  const { data, setFilters, setSort } = useFilteredSortedData({
    defaultFilters: defaultMedicationFilters,
    defaultSort: defaultMedicationSort,
    records: query.data,
  });

  return (
    <div className={className}>
      <ResourceTableActions
        filterOptions={{
          onChange: setFilters,
          defaultState: defaultMedicationFilters,
          filters: medicationFilters(query.data ?? [], outside),
        }}
        sortOptions={{
          defaultSort: defaultMedicationSort,
          options: medicationSortOptions,
          onChange: setSort,
        }}
        action={action}
      />

      <ResourceTable
        className="ctw-patient-medications"
        columns={patientMedicationColumns}
        data={data}
        emptyMessage="There are no medication records available."
        isLoading={query.isLoading}
        onRowClick={(medication) => showMedicationHistory({ medication })}
        rowActions={rowActions}
      />
    </div>
  );
};

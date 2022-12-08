import { filterOtherConditions } from "./helpers";
import { PatientConditionsActions } from "./patient-conditions-actions";
import { patientConditionsColumns } from "./patient-conditions-columns";
import { useConditionFilters } from "./patient-conditions-filters";
import { PatientConditionsHeader } from "./patient-conditions-header";
import { Table } from "@/components/core/table/table";
import {
  useOtherProviderConditions,
  usePatientConditions,
} from "@/fhir/conditions";

export type PatientConditionsProps = {
  className?: string;
  readOnly?: boolean;
};

export function PatientConditions(props: PatientConditionsProps) {
  // State.
  const { filters, updateFilters, applyFilters } = useConditionFilters();

  // Data fetching.
  const patientConditionsQuery = usePatientConditions();
  const otherConditionsQuery = useOtherProviderConditions();

  function isLoading() {
    const isLoadingPatient = patientConditionsQuery.isLoading;
    const isLoadingOther = isLoadingPatient || otherConditionsQuery.isLoading;
    return filters.collection === "patient" ? isLoadingPatient : isLoadingOther;
  }

  // Get our conditions.
  const patientConditions = patientConditionsQuery.data ?? [];
  const otherConditions = filterOtherConditions(
    otherConditionsQuery.data ?? [],
    patientConditions,
    true
  );
  const conditions = applyFilters(patientConditions, otherConditions);

  return (
    <div className="ctw-border ctw-border-solid ctw-border-divider-light">
      <PatientConditionsHeader
        otherConditions={otherConditions}
        collection={filters.collection}
        onCollectionChange={(collection) => updateFilters({ collection })}
      />
      <PatientConditionsActions
        onToggleShowHistoric={() =>
          updateFilters({ showHistoric: !filters.showHistoric })
        }
      />
      <Table
        className="-ctw-mx-px !ctw-rounded-none"
        showTableHead={false}
        isLoading={isLoading()}
        records={conditions}
        columns={patientConditionsColumns}
      />
    </div>
  );
}

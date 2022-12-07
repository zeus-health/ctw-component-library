import { cloneDeep, merge } from "lodash";
import { useState } from "react";
import { filterOtherConditions } from "./helpers";
import { PatientConditionsActions } from "./patient-conditions-actions";
import { patientConditionsColumns } from "./patient-conditions-columns";
import { Filters } from "./patient-conditions-filters";
import { PatientConditionsHeader } from "./patient-conditions-header";
import { usePatient } from "@/components/core/patient-provider";
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
  // Local state
  const [filters, setFilters] = useState<Filters>({
    collection: "patient",
    showHistoric: false,
  });

  // Data fetching
  const patientResponse = usePatient();
  const patientRecordsResponse = usePatientConditions();
  const otherProviderRecordsResponse = useOtherProviderConditions();

  function isLoading() {
    const isLoadingPatient =
      patientResponse.isLoading || patientRecordsResponse.isLoading;
    const isLoadingOther =
      isLoadingPatient || otherProviderRecordsResponse.isLoading;
    return filters.collection === "patient" ? isLoadingPatient : isLoadingOther;
  }

  // Grab either the patient or other conditions collection.
  const patientConditions = patientRecordsResponse.data ?? [];
  const otherConditions = filterOtherConditions(
    otherProviderRecordsResponse.data ?? [],
    patientConditions,
    false
  );
  let conditions =
    filters.collection === "patient" ? patientConditions : otherConditions;

  // Apply filtering.
  conditions = conditions.filter((c) => {
    if (filters.showHistoric) return true;

    return ["Active", "Pending"].includes(c.status);
  });

  function updateFilters(newFilters: Partial<Filters>) {
    setFilters(merge(cloneDeep(filters), newFilters));
  }

  return (
    <div className="ctw-border ctw-border-solid ctw-border-divider-light">
      <PatientConditionsHeader
        otherCount={otherConditions.length}
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

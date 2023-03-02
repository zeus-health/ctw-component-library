import { useEffect, useState } from "react";
import { useMedicationHistory } from "./medication-history-drawer";
import {
  MedsHistoryTempProps as MedHistoryTempProps,
  MedicationsTableBase,
} from "@/components/content/medications-table-base";
import {
  defaultMedicationSort,
  medicationSortOptions,
} from "@/components/content/medications/patient-medications-sort";
import { SortButton } from "@/components/core/sort-button/sort-button";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";
import { get, isFunction, pipe, toLower } from "@/utils/nodash/fp";
import { sort } from "@/utils/sort";

export type InactiveMedRecordsTableProps = {
  className?: string;
} & MedHistoryTempProps;

/**
 * Displays a table of inactive medication records. These are builder-owned medications
 * that have a status other than "active". These are not to be confused with "dismissed" or "archived"
 * medication records pulled from the network of other providers.
 */
export function ProviderInactiveMedicationsTable({
  className,
  onAfterOpenHistoryDrawer,
  onOpenHistoryDrawer,
}: InactiveMedRecordsTableProps) {
  const [medicationModels, setMedicationModels] = useState<
    MedicationStatementModel[]
  >([]);
  const openMedHistoryDrawer = useMedicationHistory();
  const { builderMedications, isLoading } = useQueryAllPatientMedications();
  const { data, setSort } = useFilteredSortedData({
    defaultFilters: {},
    defaultSort: defaultMedicationSort,
    records: builderMedications,
  });

  function openHistoryDrawer(row: MedicationStatementModel) {
    // Temp - onOpen and onAfterOpen should be side-effect free as
    // they may be called after component unmounts. We added
    // this to support a bug-fix workaround in canvas.
    if (isFunction(onOpenHistoryDrawer)) {
      onOpenHistoryDrawer();
    }
    openMedHistoryDrawer({ medication: row });
    setTimeout(() => {
      if (isFunction(onAfterOpenHistoryDrawer)) {
        onAfterOpenHistoryDrawer();
      }
    }, 0);
  }

  useEffect(() => {
    setMedicationModels(
      sort(
        data.filter((bm) => bm.displayStatus !== "Active"),
        pipe(get("display"), toLower),
        "asc"
      )
    );
  }, [data]);

  return (
    <>
      <div className="ctw-flex ctw-flex-wrap ctw-gap-x-2">
        <SortButton
          className="ctw-my-2"
          options={medicationSortOptions}
          onChange={setSort}
          defaultSort={defaultMedicationSort}
        />
      </div>

      <MedicationsTableBase
        className={className}
        medicationStatements={medicationModels}
        isLoading={isLoading}
        handleRowClick={openHistoryDrawer}
      />
    </>
  );
}

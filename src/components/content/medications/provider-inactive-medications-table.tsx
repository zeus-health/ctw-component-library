import { useEffect, useState } from "react";
import { useMedicationHistory } from "./medication-history-drawer";
import {
  MedsHistoryTempProps as MedHistoryTempProps,
  MedicationsTableBase,
} from "@/components/content/medications-table-base";
import { useMedicationSorts } from "@/components/content/medications/patient-medications-sort";
import { SortButton } from "@/components/core/sort-button/sort-button";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";
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
  const { currentSorts, updateSorts, sortOptions, applySorts } =
    useMedicationSorts();

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
    if (!builderMedications) return;
    setMedicationModels(
      sort(
        builderMedications.filter((bm) => bm.displayStatus !== "Active"),
        pipe(get("display"), toLower),
        "asc"
      )
    );
  }, [builderMedications]);

  return (
    <>
      <div className="ctw-flex ctw-flex-wrap ctw-gap-x-2">
        <SortButton
          className="ctw-my-2"
          options={sortOptions}
          updateSorts={updateSorts}
          currentSorts={currentSorts}
        />
      </div>

      <MedicationsTableBase
        className={className}
        medicationStatements={applySorts(medicationModels)}
        isLoading={isLoading}
        handleRowClick={openHistoryDrawer}
      />
    </>
  );
}

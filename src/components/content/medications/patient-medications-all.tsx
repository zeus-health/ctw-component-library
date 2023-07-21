import cx from "classnames";
import { useMemo } from "react";
import { useAddMedicationForm } from "./helpers/add-new-med-drawer";
import { patientMedicationsAllColumns } from "./helpers/columns";
import { useMedicationDetailsDrawer } from "./helpers/details";
import { defaultMedicationFilters, medicationFilters } from "./helpers/filters";
import { defaultMedicationSort, medicationSortOptions } from "./helpers/sorts";
import { useToggleRead } from "../hooks/use-toggle-read";
import { ResourceTable } from "../resource/resource-table";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { EmptyTable } from "@/components/core/empty-table";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useUserBuilderId } from "@/components/core/providers/user-builder-id";
import { RowActionsProps } from "@/components/core/table/table";
import { MedicationStatementModel } from "@/fhir/models";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";
import { useBaseTranslations } from "@/i18n";

export type PatientMedicationsAllProps = {
  className?: string;
  readOnly?: boolean;
  onAddToRecord?: (record: MedicationStatementModel) => void;
};

function PatientMedicationsAllComponent({
  className,
  readOnly,
  onAddToRecord,
}: PatientMedicationsAllProps) {
  const userBuilderId = useUserBuilderId();
  const query = useQueryAllPatientMedications();
  const { data, setFilters, setSort } = useFilteredSortedData({
    defaultFilters: defaultMedicationFilters,
    defaultSort: defaultMedicationSort,
    records: query.allMedications,
  });

  const isEmptyQuery = query.allMedications.length === 0;
  const hasZeroFilteredRecords = !isEmptyQuery && data.length === 0;
  const empty = (
    <EmptyTable hasZeroFilteredRecords={hasZeroFilteredRecords} resourceName="medications" />
  );

  const rowActions = useMemo(
    () => (!readOnly ? getRowActions(userBuilderId, onAddToRecord) : undefined),
    [userBuilderId, readOnly, onAddToRecord]
  );

  const openDetails = useMedicationDetailsDrawer({
    RowActions: rowActions,
    enableDismissAndReadActions: true,
  });

  return (
    <div
      className={cx(className, "ctw-scrollable-pass-through-height")}
      data-zus-telemetry-namespace="Medications"
    >
      <ResourceTableActions
        filterOptions={{
          onChange: setFilters,
          defaultState: defaultMedicationFilters,
          filters: medicationFilters(query.allMedications, true),
        }}
        sortOptions={{
          defaultSort: defaultMedicationSort,
          options: medicationSortOptions,
          onChange: setSort,
        }}
      />
      <ResourceTable
        showTableHead
        isLoading={query.isLoading}
        data={data}
        columns={patientMedicationsAllColumns(userBuilderId)}
        onRowClick={openDetails}
        RowActions={rowActions}
        enableDismissAndReadActions
        emptyMessage={empty}
      />
    </div>
  );
}

export const PatientMedicationsAll = withErrorBoundary(
  PatientMedicationsAllComponent,
  "PatientMedicationsAll"
);

const getRowActions =
  (userBuilderId: string, onAddToRecord?: (record: MedicationStatementModel) => void) =>
  ({ record, onSuccess }: RowActionsProps<MedicationStatementModel>) => {
    const { t } = useBaseTranslations();
    const showAddMedicationForm = useAddMedicationForm();
    const { toggleRead } = useToggleRead();

    if (!record.ownedByBuilder(userBuilderId)) {
      return (
        <button
          type="button"
          className="ctw-btn-primary"
          onClick={async () => {
            void toggleRead(record);
            if (onAddToRecord) {
              onAddToRecord(record);
              onSuccess?.();
            } else {
              showAddMedicationForm(record);
            }
          }}
        >
          {t("resourceTable.add")}
        </button>
      );
    }
    return null;
  };

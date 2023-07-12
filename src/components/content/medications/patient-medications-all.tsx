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
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useUserBuilderId } from "@/components/core/providers/user-builder-id";
import { RowActionsProps } from "@/components/core/table/table";
import { MedicationStatementModel } from "@/fhir/models";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import { useBaseTranslations } from "@/i18n";
import { usePatientMedicationsAll } from "@/services/medications";

export type PatientMedicationsAllProps = {
  className?: string;
  readOnly?: boolean;
  onlyAllowAddOutsideMedications?: boolean;
};

function PatientMedicationsAllComponent({
  className,
  readOnly = false,
  onlyAllowAddOutsideMedications = false,
}: PatientMedicationsAllProps) {
  const userBuilderId = useUserBuilderId();
  const { t } = useBaseTranslations();
  const query = usePatientMedicationsAll();
  const showAddMedicationForm = useAddMedicationForm();
  const { data, setFilters, setSort } = useFilteredSortedData({
    defaultFilters: defaultMedicationFilters,
    defaultSort: defaultMedicationSort,
    records: query.data,
  });

  const openDetails = useMedicationDetailsDrawer();

  const rowActions = useMemo(
    () => (!readOnly ? getRowActions(userBuilderId, onlyAllowAddOutsideMedications) : undefined),
    [userBuilderId, readOnly, onlyAllowAddOutsideMedications]
  );

  const action = !readOnly && !onlyAllowAddOutsideMedications && (
    <button type="button" className="ctw-btn-primary" onClick={() => showAddMedicationForm()}>
      Add Medication
    </button>
  );

  return (
    <div
      className={cx(className, "ctw-scrollable-pass-through-height")}
      data-zus-telemetry-namespace="Medications"
    >
      <ResourceTableActions
        filterOptions={{
          onChange: setFilters,
          defaultState: defaultMedicationFilters,
          filters: medicationFilters(query.data, true),
        }}
        sortOptions={{
          defaultSort: defaultMedicationSort,
          options: medicationSortOptions,
          onChange: setSort,
        }}
        action={action}
      />
      <ResourceTable
        showTableHead
        isLoading={query.isLoading}
        data={data}
        columns={patientMedicationsAllColumns(userBuilderId)}
        onRowClick={openDetails}
        RowActions={rowActions}
        enableDismissAndReadActions
      />
    </div>
  );
}

export const PatientMedicationsAll = withErrorBoundary(
  PatientMedicationsAllComponent,
  "PatientMedicationsAll"
);

const getRowActions =
  (userBuilderId: string, onlyAllowAddOutsideMedications: boolean) =>
  ({ record }: RowActionsProps<MedicationStatementModel>) => {
    const { t } = useBaseTranslations();
    const showAddMedicationForm = useAddMedicationForm();
    const showEditMedicationForm = useEditMedicationForm();
    const confirmDelete = useConfirmDeleteMedication();
    const { toggleRead } = useToggleRead();

    if (record.ownedByBuilder(userBuilderId) && !onlyAllowAddOutsideMedications) {
      return (
        <div className="ctw-flex ctw-space-x-2">
          {!record.isDeleted && (
            <button type="button" className="ctw-btn-default" onClick={() => confirmDelete(record)}>
              Remove
            </button>
          )}

          <button
            type="button"
            className="ctw-btn-primary"
            onClick={() => showEditMedicationForm(record)}
          >
            Edit
          </button>
        </div>
      );
    }
    if (!record.ownedByBuilder(userBuilderId)) {
      return (
        <button
          type="button"
          className="ctw-btn-primary"
          onClick={() => {
            toggleRead(record);
            showAddMedicationForm(record);
          }}
        >
          {t("resourceTable.add")}
        </button>
      );
    }
    return null;
  };

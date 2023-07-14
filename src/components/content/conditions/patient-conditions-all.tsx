import cx from "classnames";
import { useMemo } from "react";
import { patientConditionsAllColumns } from "./helpers/columns";
import { useConditionDetailsDrawer } from "./helpers/details";
import { conditionFilters, defaultConditionFilters } from "./helpers/filters";
import {
  useAddConditionForm,
  useConfirmDeleteCondition,
  useEditConditionForm,
} from "./helpers/modal-hooks";
import { conditionSortOptions, defaultConditionSort } from "./helpers/sorts";
import { useToggleRead } from "../hooks/use-toggle-read";
import { ResourceTable } from "../resource/resource-table";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { EmptyTable } from "@/components/core/empty-table";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useUserBuilderId } from "@/components/core/providers/user-builder-id";
import { RowActionsProps } from "@/components/core/table/table";
import { ConditionModel } from "@/fhir/models";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import { useBaseTranslations } from "@/i18n";
import { usePatientConditionsAll } from "@/services/conditions";

export type PatientConditionsAllProps = {
  className?: string;
  readOnly?: boolean;
  onlyAllowAddOutsideConditions?: boolean;
};

function PatientConditionsAllComponent({
  className,
  readOnly = false,
  onlyAllowAddOutsideConditions = false,
}: PatientConditionsAllProps) {
  const userBuilderId = useUserBuilderId();
  const { t } = useBaseTranslations();
  const query = usePatientConditionsAll();
  const showAddConditionForm = useAddConditionForm();
  const { data, setFilters, setSort } = useFilteredSortedData({
    defaultFilters: defaultConditionFilters,
    defaultSort: defaultConditionSort,
    records: query.data,
  });

  const isEmptyQuery = query.data?.length === 0;
  const hasZeroFilteredRecords = !isEmptyQuery && data.length === 0;

  const empty = (
    <EmptyTable hasZeroFilteredRecords={hasZeroFilteredRecords} resourceName="conditions" />
  );

  const openDetails = useConditionDetailsDrawer({
    canRemove: !readOnly && !onlyAllowAddOutsideConditions,
    canEdit: !readOnly && !onlyAllowAddOutsideConditions,
  });

  const rowActions = useMemo(
    () => (!readOnly ? getRowActions(userBuilderId, onlyAllowAddOutsideConditions) : undefined),
    [userBuilderId, readOnly, onlyAllowAddOutsideConditions]
  );

  const action = !readOnly && !onlyAllowAddOutsideConditions && (
    <button type="button" className="ctw-btn-primary" onClick={() => showAddConditionForm()}>
      {t("resource.add", { resource: t("glossary:condition_one") })}
    </button>
  );

  return (
    <div
      className={cx(className, "ctw-scrollable-pass-through-height")}
      data-zus-telemetry-namespace="Conditions"
    >
      <ResourceTableActions
        filterOptions={{
          onChange: setFilters,
          defaultState: defaultConditionFilters,
          filters: conditionFilters(query.data, true, true),
        }}
        sortOptions={{
          defaultSort: defaultConditionSort,
          options: conditionSortOptions,
          onChange: setSort,
        }}
        action={action}
      />
      <ResourceTable
        showTableHead
        isLoading={query.isLoading}
        data={data}
        columns={patientConditionsAllColumns(userBuilderId)}
        onRowClick={openDetails}
        RowActions={rowActions}
        enableDismissAndReadActions
        emptyMessage={empty}
      />
    </div>
  );
}

export const PatientConditionsAll = withErrorBoundary(
  PatientConditionsAllComponent,
  "PatientConditionsAll"
);

const getRowActions =
  (userBuilderId: string, onlyAllowAddOutsideConditions: boolean) =>
  ({ record }: RowActionsProps<ConditionModel>) => {
    const { t } = useBaseTranslations();
    const showAddConditionForm = useAddConditionForm();
    const showEditConditionForm = useEditConditionForm();
    const confirmDelete = useConfirmDeleteCondition();
    const { toggleRead } = useToggleRead();

    if (record.ownedByBuilder(userBuilderId) && !onlyAllowAddOutsideConditions) {
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
            onClick={() => showEditConditionForm(record)}
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
            showAddConditionForm(record);
          }}
        >
          {t("resourceTable.add")}
        </button>
      );
    }
    return null;
  };

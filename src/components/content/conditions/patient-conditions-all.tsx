import cx from "classnames";
import { useCallback } from "react";
import { patientConditionsAllColumns } from "./helpers/columns";
import { useConditionDetailsDrawer } from "./helpers/details";
import { conditionFilters } from "./helpers/filters";
import {
  useAddConditionForm,
  useConfirmDeleteCondition,
  useEditConditionForm,
} from "./helpers/modal-hooks";
import { conditionSortOptions, defaultConditionSort } from "./helpers/sorts";
import { ConditionViewOptions, statusView } from "./helpers/views";
import { useToggleRead } from "../hooks/use-toggle-read";
import { PatientResourceTable } from "../resource/patient-resource-table";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { EmptyPatientTable } from "@/components/core/empty-table";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { useUserBuilderId } from "@/components/core/providers/user-builder-id";
import { RowActionsConfigProp } from "@/components/core/table/table-rows";
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
  const rowActions = useRowActions(userBuilderId, onlyAllowAddOutsideConditions, readOnly);
  const { viewOptions, current } = statusView;

  const { data, setFilters, setSort, viewOption, setViewOption } = useFilteredSortedData({
    defaultSort: defaultConditionSort,
    records: query.data,
    defaultView: current,
  });

  const isEmptyQuery = query.data.length === 0;
  const hasZeroFilteredRecords = !isEmptyQuery && data.length === 0;

  const empty = (
    <EmptyPatientTable hasZeroFilteredRecords={hasZeroFilteredRecords} resourceName="conditions" />
  );

  const openDetails = useConditionDetailsDrawer({
    rowActions,
    enableDismissAndReadActions: true,
  });

  const action = !readOnly && !onlyAllowAddOutsideConditions && (
    <button
      type="button"
      className="ctw-btn-primary ctw-flex ctw-w-full ctw-text-center"
      onClick={() => showAddConditionForm()}
    >
      {t("resource.add", { resource: t("glossary:condition_one") })}
    </button>
  );

  return (
    <AnalyticsProvider componentName="PatientConditionsAll">
      <div className={cx(className, "ctw-scrollable-pass-through-height")}>
        <ResourceTableActions
          filterOptions={{
            onChange: setFilters,
            filters: conditionFilters(
              query.data,
              true,
              true,
              viewOption?.display as ConditionViewOptions
            ),
          }}
          sortOptions={{
            defaultSort: defaultConditionSort,
            options: conditionSortOptions,
            onChange: setSort,
          }}
          viewOptions={{
            onChange: setViewOption,
            options: viewOptions,
            defaultView: current,
          }}
          action={action}
        />
        <PatientResourceTable
          showTableHead
          isLoading={query.isLoading}
          data={data}
          columns={patientConditionsAllColumns(userBuilderId)}
          onRowClick={openDetails}
          rowActions={rowActions}
          enableDismissAndReadActions
          emptyMessage={empty}
        />
      </div>
    </AnalyticsProvider>
  );
}

export const PatientConditionsAll = withErrorBoundary(
  PatientConditionsAllComponent,
  "PatientConditionsAll"
);

function useRowActions(
  userBuilderId: string,
  onlyAllowAddOutsideConditions: boolean,
  readOnly: boolean
): (r: ConditionModel) => RowActionsConfigProp<ConditionModel> {
  const { t } = useBaseTranslations();
  const showAddConditionForm = useAddConditionForm();
  const showEditConditionForm = useEditConditionForm();
  const confirmDelete = useConfirmDeleteCondition();
  const { toggleRead } = useToggleRead();

  return useCallback(
    (record: ConditionModel): RowActionsConfigProp<ConditionModel> => {
      if (readOnly) {
        return [];
      }
      if (record.ownedByBuilder(userBuilderId) && !onlyAllowAddOutsideConditions) {
        return [
          {
            className: "ctw-btn-default",
            onClick: () => confirmDelete(record),
            text: "Remove",
          },
          {
            className: "ctw-btn-primary",
            onClick: () => {
              showEditConditionForm(record);
            },
            text: "Edit",
          },
        ];
      }

      if (!record.ownedByBuilder(userBuilderId)) {
        return [
          {
            className: "ctw-btn-primary",
            text: t("resourceTable.add"),
            onClick: () => {
              if (!record.isRead) {
                void toggleRead(record);
              }
              showAddConditionForm(record);
            },
          },
        ];
      }

      return [];
    },
    [
      confirmDelete,
      onlyAllowAddOutsideConditions,
      readOnly,
      showAddConditionForm,
      showEditConditionForm,
      t,
      toggleRead,
      userBuilderId,
    ]
  );
}

import cx from "classnames";
import { useMemo } from "react";
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
import { useAnalytics } from "@/components/core/providers/analytics/use-analytics";
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

  const { viewOptions, current } = statusView;
  const { trackInteraction } = useAnalytics();

  const { data, setFilters, setSort, viewOption, setViewOption } = useFilteredSortedData({
    defaultSort: defaultConditionSort,
    records: query.data,
    defaultView: current,
  });

  const isEmptyQuery = query.data.length === 0;
  const hasZeroFilteredRecords = !isEmptyQuery && data.length === 0;

  const empty = (
    <EmptyPatientTable
      hasZeroFilteredRecords={hasZeroFilteredRecords}
      resourceName="conditions"
      trackInteraction={trackInteraction}
    />
  );

  const RowActions = useMemo(
    () => (!readOnly ? getRowActions(userBuilderId, onlyAllowAddOutsideConditions) : undefined),
    [userBuilderId, readOnly, onlyAllowAddOutsideConditions]
  );

  const openDetails = useConditionDetailsDrawer({
    RowActions,
    enableDismissAndReadActions: true,
  });

  const action = !readOnly && !onlyAllowAddOutsideConditions && (
    <button type="button" className="ctw-btn-primary" onClick={() => showAddConditionForm()}>
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
          RowActions={RowActions}
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
            if (!record.isRead) {
              void toggleRead(record);
            }
            showAddConditionForm(record);
          }}
        >
          {t("resourceTable.add")}
        </button>
      );
    }
    return null;
  };

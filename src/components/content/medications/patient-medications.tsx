import cx from "classnames";
import { useEffect, useMemo, useState } from "react";
import { useAddMedicationForm } from "./helpers/add-new-med-drawer";
import { patientMedicationsColumns } from "./helpers/columns";
import { useMedicationDetailsDrawer } from "./helpers/details";
import { defaultMedicationFilters, medicationFilters } from "./helpers/filters";
import { defaultMedicationSort, medicationSortOptions } from "./helpers/sorts";
import { useToggleDismiss } from "../hooks/use-toggle-dismiss";
import { useToggleRead } from "../hooks/use-toggle-read";
import { getDateRangeView } from "../resource/helpers/view-date-range";
import { ResourceTable } from "../resource/resource-table";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useCTW } from "@/components/core/providers/use-ctw";
import { Spinner } from "@/components/core/spinner";
import { RowActionsProps } from "@/components/core/table/table";
import { MedicationStatementModel } from "@/fhir/models";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import { usePatientMedications } from "@/hooks/use-medications";
import { useBaseTranslations } from "@/i18n";
import { QUERY_KEY_BASIC, QUERY_KEY_SUMMARY_MEDICATIONS } from "@/utils/query-keys";

export type PatientMedicationsProps = {
  className?: string;
  onAddToRecord?: (record: MedicationStatementModel) => void;
  readOnly?: boolean;
};

function PatientMedicationsComponent({
  className,
  onAddToRecord,
  readOnly,
}: PatientMedicationsProps) {
  const { featureFlags, getRequestContext } = useCTW();
  const patientMedicationsQuery = usePatientMedications();
  const { viewOptions, defaultView } =
    getDateRangeView<MedicationStatementModel>("lastActivityDate");
  const { data, setFilters, setSort, setViewOption } = useFilteredSortedData({
    defaultView,
    defaultFilters: defaultMedicationFilters,
    defaultSort: defaultMedicationSort,
    records: patientMedicationsQuery.data,
  });
  const openDetails = useMedicationDetailsDrawer();
  const [userBuilderId, setUserBuilderId] = useState("");

  useEffect(() => {
    async function load() {
      const requestContext = await getRequestContext();
      setUserBuilderId(requestContext.builderId);
    }

    void load();
  }, [getRequestContext]);

  const rowActions = useMemo(
    () => (readOnly ? undefined : getRowActions(userBuilderId, onAddToRecord)),
    [userBuilderId, onAddToRecord, readOnly]
  );

  const { toggleRead } = useToggleRead(QUERY_KEY_SUMMARY_MEDICATIONS, QUERY_KEY_BASIC);

  const handleRowClick = (record: MedicationStatementModel) => {
    if (!record.isRead && !readOnly && !record.ownedByBuilder(userBuilderId)) {
      toggleRead(record);
    }
    openDetails(record);
  };

  return (
    <div
      className={cx(className, "ctw-scrollable-pass-through-height")}
      data-zus-telemetry-namespace="Medications"
    >
      <ResourceTableActions
        viewOptions={{
          onChange: setViewOption,
          defaultView,
          options: viewOptions,
        }}
        filterOptions={{
          onChange: setFilters,
          defaultState: defaultMedicationFilters,
          filters: medicationFilters(patientMedicationsQuery.data),
        }}
        sortOptions={{
          defaultSort: defaultMedicationSort,
          options: medicationSortOptions,
          onChange: setSort,
        }}
      />
      <ResourceTable
        showTableHead
        isLoading={patientMedicationsQuery.isLoading}
        data={data}
        columns={patientMedicationsColumns(userBuilderId, featureFlags?.enableViewFhirButton)}
        onRowClick={handleRowClick}
        rowActions={rowActions}
        boldUnreadRows
      />
    </div>
  );
}

export const PatientMedications = withErrorBoundary(
  PatientMedicationsComponent,
  "PatientMedications"
);

const getRowActions =
  (userBuilderId: string, onAddToRecord?: (record: MedicationStatementModel) => void) =>
  ({ record }: RowActionsProps<MedicationStatementModel>) => {
    const { t } = useBaseTranslations();
    const showAddMedicationForm = useAddMedicationForm();
    const { isLoading: isToggleDismissLoading, toggleDismiss } = useToggleDismiss(
      QUERY_KEY_SUMMARY_MEDICATIONS,
      QUERY_KEY_BASIC
    );
    const { isLoading: isToggleReadLoading, toggleRead } = useToggleRead(
      QUERY_KEY_SUMMARY_MEDICATIONS,
      QUERY_KEY_BASIC
    );
    const archiveLabel = record.isDismissed
      ? t("resourceTable.restore")
      : t("resourceTable.dismiss");

    const readLabel = record.isRead ? t("resourceTable.unread") : t("resourceTable.read");

    return record.ownedByBuilder(userBuilderId) ? (
      <></>
    ) : (
      <div className="ctw-flex ctw-space-x-2">
        <button
          type="button"
          className="ctw-btn-default"
          disabled={isToggleDismissLoading || isToggleReadLoading}
          onClick={() => {
            toggleDismiss(record);
            if (!record.isRead) {
              toggleRead(record);
            }
          }}
        >
          {isToggleDismissLoading ? (
            <div className="ctw-flex">
              <Spinner className="ctw-mx-4 ctw-align-middle" />
            </div>
          ) : (
            archiveLabel
          )}
        </button>
        <button
          type="button"
          className="ctw-btn-default"
          disabled={isToggleDismissLoading || isToggleReadLoading}
          onClick={() => {
            toggleRead(record);
          }}
        >
          {isToggleReadLoading ? (
            <div className="ctw-flex">
              <Spinner className="ctw-mx-4 ctw-align-middle" />
            </div>
          ) : (
            readLabel
          )}
        </button>
        <button
          type="button"
          className="ctw-btn-primary ctw-ml-1 ctw-capitalize"
          data-zus-telemetry-click="Add to record"
          data-testid="add-to-record"
          disabled={isToggleDismissLoading || isToggleReadLoading}
          onClick={() => {
            if (onAddToRecord) {
              onAddToRecord(record);
            } else {
              showAddMedicationForm(record);
            }
          }}
        >
          {t("resourceTable.add")}
        </button>
      </div>
    );
  };

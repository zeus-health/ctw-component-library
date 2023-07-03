import cx from "classnames";
import { useEffect, useMemo, useState } from "react";
import { patientMedicationsColumns } from "./helpers/columns";
import { useMedicationDetailsDrawer } from "./helpers/details";
import { defaultMedicationFilters, medicationFilters } from "./helpers/filters";
import { defaultMedicationSort, medicationSortOptions } from "./helpers/sorts";
import { useToggleDismiss } from "../hooks/use-toggle-dismiss";
import { useToggleRead } from "../hooks/use-toggle-read";
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
import {
  QUERY_KEY_BASIC,
  QUERY_KEY_PATIENT_ALLERGIES,
  QUERY_KEY_SUMMARY_MEDICATIONS,
} from "@/utils/query-keys";

export type PatientMedicationsProps = {
  className?: string;
};

function PatientMedicationsComponent({ className }: PatientMedicationsProps) {
  const { featureFlags, getRequestContext } = useCTW();
  const patientMedicationsQuery = usePatientMedications();
  const { data, setFilters, setSort } = useFilteredSortedData({
    defaultFilters: defaultMedicationFilters,
    defaultSort: defaultMedicationSort,
    records: patientMedicationsQuery.medications,
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

  const rowActions = useMemo(() => getRowActions(userBuilderId), [userBuilderId]);

  const { toggleRead } = useToggleRead(QUERY_KEY_PATIENT_ALLERGIES, QUERY_KEY_BASIC);

  const handleRowClick = (record: MedicationStatementModel) => {
    if (!record.isRead) {
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
        filterOptions={{
          onChange: setFilters,
          defaultState: defaultMedicationFilters,
          filters: medicationFilters(data, true),
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
  (userBuilderId: string) =>
  ({ record }: RowActionsProps<MedicationStatementModel>) => {
    const { t } = useBaseTranslations();
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
      </div>
    );
  };

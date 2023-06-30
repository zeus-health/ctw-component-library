import cx from "classnames";
import { useEffect, useMemo, useState } from "react";
import { patientImmunizationsColumns } from "./helpers/columns";
import { defaultImmunizationsFilters, immunizationsFilter } from "./helpers/filters";
import { defaultImmunizationSort, immunizationSortOptions } from "./helpers/sort";
import { useToggleDismiss } from "../hooks/use-toggle-dismiss";
import { useToggleRead } from "../hooks/use-toggle-read";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { ResourceTable } from "../resource/resource-table";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { CodingList } from "@/components/core/coding-list";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useCTW } from "@/components/core/providers/use-ctw";
import { Spinner } from "@/components/core/spinner";
import { RowActionsProps } from "@/components/core/table/table";
import { usePatientImmunizations } from "@/fhir/immunizations";
import { ImmunizationModel } from "@/fhir/models/immunization";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import { useFQSFeatureToggle } from "@/hooks/use-fqs-feature-toggle";
import { useBaseTranslations } from "@/i18n";
import { QUERY_KEY_BASIC, QUERY_KEY_PATIENT_IMMUNIZATIONS } from "@/utils/query-keys";

export type PatientImmunizationsProps = {
  className?: string;
};

function PatientImmunizationsComponent({ className }: PatientImmunizationsProps) {
  const { featureFlags, getRequestContext } = useCTW();
  const { enabled } = useFQSFeatureToggle("immunizations");
  const patientImmunizationsQuery = usePatientImmunizations();
  const { data, setFilters, setSort } = useFilteredSortedData({
    defaultFilters: defaultImmunizationsFilters,
    defaultSort: defaultImmunizationSort,
    records: patientImmunizationsQuery.data,
  });
  const [userBuilderId, setUserBuilderId] = useState("");

  const openDetails = useResourceDetailsDrawer({
    header: (m) => m.description,
    details: immunizationData,
    getSourceDocument: true,
    enableFQS: enabled,
  });

  useEffect(() => {
    async function load() {
      const requestContext = await getRequestContext();
      setUserBuilderId(requestContext.builderId);
    }

    void load();
  }, [getRequestContext]);

  const rowActions = useMemo(() => getRowActions(userBuilderId), [userBuilderId]);

  const { toggleRead } = useToggleRead(QUERY_KEY_PATIENT_IMMUNIZATIONS, QUERY_KEY_BASIC);

  const handleRowClick = (record: ImmunizationModel) => {
    if (!record.isRead) {
      toggleRead(record);
    }
    openDetails(record);
  };

  return (
    <div
      className={cx(className, "ctw-scrollable-pass-through-height")}
      data-zus-telemetry-namespace="Immunizations"
    >
      <ResourceTableActions
        filterOptions={{
          onChange: setFilters,
          defaultState: defaultImmunizationsFilters,
          filters: immunizationsFilter(),
        }}
        sortOptions={{
          defaultSort: defaultImmunizationSort,
          options: immunizationSortOptions,
          onChange: setSort,
        }}
      />
      <ResourceTable
        showTableHead
        isLoading={patientImmunizationsQuery.isLoading}
        data={data}
        columns={patientImmunizationsColumns(userBuilderId, featureFlags?.enableViewFhirButton)}
        onRowClick={handleRowClick}
        rowActions={rowActions}
        boldUnreadRows
      />
    </div>
  );
}

export const PatientImmunizations = withErrorBoundary(
  PatientImmunizationsComponent,
  "PatientImmunizations"
);

const immunizationData = (immunization: ImmunizationModel) => [
  { label: "Date", value: immunization.occurrence },
  { label: "Description", value: immunization.description },
  {
    label: "Vaccine Code",
    value: immunization.resource.vaccineCode.coding ? (
      <CodingList codings={immunization.resource.vaccineCode.coding} />
    ) : undefined,
  },
];

const getRowActions =
  (userBuilderId: string) =>
  ({ record }: RowActionsProps<ImmunizationModel>) => {
    const { t } = useBaseTranslations();
    const { isLoading: isToggleDismissLoading, toggleDismiss } = useToggleDismiss(
      QUERY_KEY_PATIENT_IMMUNIZATIONS,
      QUERY_KEY_BASIC
    );
    const { isLoading: isToggleReadLoading, toggleRead } = useToggleRead(
      QUERY_KEY_PATIENT_IMMUNIZATIONS,
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

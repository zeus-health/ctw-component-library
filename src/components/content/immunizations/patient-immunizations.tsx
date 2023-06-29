import cx from "classnames";
import { useMemo } from "react";
import { patientImmunizationsColumns } from "./helpers/columns";
import { defaultImmunizationFilters, immunizationFilter } from "./helpers/filters";
import { defaultImmunizationSort, immunizationSortOptions } from "./helpers/sort";
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
  const { featureFlags, builderId } = useCTW();
  const { enabled } = useFQSFeatureToggle("immunizations");
  const patientImmunizationsQuery = usePatientImmunizations();
  const { data, setFilters, setSort } = useFilteredSortedData({
    defaultFilters: defaultImmunizationFilters,
    defaultSort: defaultImmunizationSort,
    records: patientImmunizationsQuery.data,
  });

  const openDetails = useResourceDetailsDrawer({
    header: (m) => m.description,
    details: immunizationData,
    getSourceDocument: true,
    enableFQS: enabled,
  });

  const rowActions = useMemo(() => getRowActions(builderId), [builderId]);

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
          defaultState: defaultImmunizationFilters,
          filters: immunizationFilter(),
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
        columns={patientImmunizationsColumns(builderId, featureFlags?.enableViewFhirButton)}
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
    const { isLoading, toggleRead } = useToggleRead(
      QUERY_KEY_PATIENT_IMMUNIZATIONS,
      QUERY_KEY_BASIC
    );

    const readLabel = record.isRead ? t("resourceTable.unread") : t("resourceTable.read");

    return record.ownedByBuilder(userBuilderId) ? (
      <></>
    ) : (
      <div className="ctw-flex ctw-space-x-2">
        <button
          type="button"
          className="ctw-btn-default"
          disabled={isLoading}
          onClick={() => {
            toggleRead(record);
          }}
        >
          {isLoading ? (
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

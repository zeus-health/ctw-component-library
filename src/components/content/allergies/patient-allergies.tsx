import cx from "classnames";
import { useEffect, useMemo, useState } from "react";
import { allergyFilter, defaultAllergyFilters } from "./helpers/filters";
import { useAllergiesHistory } from "./helpers/history";
import { allergySortOptions, defaultAllergySort } from "./helpers/sort";
import { useToggleDismiss } from "../hooks/use-toggle-dismiss";
import { useToggleRead } from "../hooks/use-toggle-read";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { ResourceTable } from "../resource/resource-table";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { patientAllergiesColumns } from "@/components/content/allergies/helpers/column";
import { EmptyTable } from "@/components/core/empty-table";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useCTW } from "@/components/core/providers/use-ctw";
import { Spinner } from "@/components/core/spinner";
import { RowActionsProps } from "@/components/core/table/table";
import { usePatientAllergies } from "@/fhir/allergies";
import { AllergyModel } from "@/fhir/models/allergies";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import { useFQSFeatureToggle } from "@/hooks/use-fqs-feature-toggle";
import { useBaseTranslations } from "@/i18n";
import { capitalize } from "@/utils/nodash";
import { QUERY_KEY_BASIC, QUERY_KEY_PATIENT_ALLERGIES } from "@/utils/query-keys";

export type PatientAllergiesProps = {
  className?: string;
};

function PatientAllergiesComponent({ className }: PatientAllergiesProps) {
  const { featureFlags, getRequestContext } = useCTW();
  const { enabled } = useFQSFeatureToggle("allergies");
  const patientAllergiesQuery = usePatientAllergies();
  const { data, setFilters, setSort } = useFilteredSortedData({
    defaultFilters: defaultAllergyFilters,
    defaultSort: defaultAllergySort,
    records: patientAllergiesQuery.data,
  });

  const isEmptyQuery = patientAllergiesQuery.data?.length === 0;
  const isEmptyFilter = data.length === 0;
  const [userBuilderId, setUserBuilderId] = useState("");

  useEffect(() => {
    async function load() {
      const requestContext = await getRequestContext();
      setUserBuilderId(requestContext.builderId);
    }

    void load();
  }, [getRequestContext]);

  const openDetails = useResourceDetailsDrawer({
    header: (m) => capitalize(m.display),
    details: allergyData,
    getHistory: useAllergiesHistory,
    getSourceDocument: true,
    enableFQS: enabled,
  });

  const rowActions = useMemo(() => getRowActions(userBuilderId), [userBuilderId]);

  const { toggleRead } = useToggleRead(QUERY_KEY_PATIENT_ALLERGIES, QUERY_KEY_BASIC);

  const handleRowClick = (record: AllergyModel) => {
    if (!record.isRead) {
      toggleRead(record);
    }
    openDetails(record);
  };

  return (
    <div
      className={cx(className, "ctw-scrollable-pass-through-height")}
      data-zus-telemetry-namespace="Allergies"
    >
      <ResourceTableActions
        filterOptions={{
          onChange: setFilters,
          defaultState: defaultAllergyFilters,
          filters: allergyFilter(),
        }}
        sortOptions={{
          defaultSort: defaultAllergySort,
          options: allergySortOptions,
          onChange: setSort,
        }}
      />
      <ResourceTable
        showTableHead
        isLoading={patientAllergiesQuery.isLoading}
        data={data}
        columns={patientAllergiesColumns(userBuilderId, featureFlags?.enableViewFhirButton)}
        onRowClick={handleRowClick}
        rowActions={rowActions}
        boldUnreadRows
        emptyMessage={
          <EmptyTable
            isEmptyQuery={isEmptyQuery}
            isEmptyFilters={isEmptyFilter}
            resourceName="allergies"
          />
        }
      />
    </div>
  );
}

export const PatientAllergies = withErrorBoundary(PatientAllergiesComponent, "PatientAllergies");

const allergyData = (allergy: AllergyModel) => [
  { label: "Recorded Date", value: allergy.recordedDate },
  { label: "Recording Organization", value: allergy.managingOrganization },
  { label: "Status", value: allergy.clinicalStatus },
  { label: "Type", value: capitalize(allergy.type) },
  { label: "Onset", value: allergy.onset },
  { label: "Reaction", value: capitalize(allergy.manifestations) },
  { label: "Severity", value: capitalize(allergy.severity) },
  { label: "Note", value: allergy.note },
];

const getRowActions =
  (userBuilderId: string) =>
  ({ record }: RowActionsProps<AllergyModel>) => {
    const { t } = useBaseTranslations();
    const { isLoading: isToggleDismissLoading, toggleDismiss } = useToggleDismiss(
      QUERY_KEY_PATIENT_ALLERGIES,
      QUERY_KEY_BASIC
    );
    const { isLoading: isToggleReadLoading, toggleRead } = useToggleRead(
      QUERY_KEY_PATIENT_ALLERGIES,
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

import cx from "classnames";
import { useAddMedicationForm } from "./helpers/add-new-med-drawer";
import { patientMedicationsAllColumns } from "./helpers/columns";
import { useMedicationDetailsDrawer } from "./helpers/details";
import { defaultMedicationFilters, medicationFilters } from "./helpers/filters";
import { defaultMedicationSort, medicationSortOptions } from "./helpers/sorts";
import { useToggleRead } from "../hooks/use-toggle-read";
import { getDateRangeView } from "../resource/helpers/view-date-range";
import { PatientResourceTable } from "../resource/patient-resource-table";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { EmptyPatientTable } from "@/components/core/empty-table";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { useUserBuilderId } from "@/components/core/providers/user-builder-id";
import { RowActionsConfigProp } from "@/components/core/table/table-rows";
import { MedicationStatementModel } from "@/fhir/models";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";
import { useBaseTranslations } from "@/i18n";

export type PatientMedicationsAllProps = {
  className?: string;
  readOnly?: boolean;
  onAddToRecord?: (record: MedicationStatementModel) => Promise<void> | void;
};

function PatientMedicationsAllComponent({
  className,
  readOnly,
  onAddToRecord,
}: PatientMedicationsAllProps) {
  const userBuilderId = useUserBuilderId();
  const query = useQueryAllPatientMedications();

  const { viewOptions, past6Months } =
    getDateRangeView<MedicationStatementModel>("lastActivityDate");

  const { data, setFilters, setSort, setViewOption } = useFilteredSortedData({
    defaultFilters: defaultMedicationFilters,
    defaultSort: defaultMedicationSort,
    defaultView: past6Months,
    records: query.allMedications,
  });

  const isEmptyQuery = query.allMedications.length === 0;
  const hasZeroFilteredRecords = !isEmptyQuery && data.length === 0;
  const empty = (
    <EmptyPatientTable hasZeroFilteredRecords={hasZeroFilteredRecords} resourceName="medications" />
  );

  const rowActions = useRowActions(onAddToRecord);

  const openDetails = useMedicationDetailsDrawer({
    rowActions: readOnly ? undefined : rowActions,
    enableDismissAndReadActions: true,
  });

  return (
    <AnalyticsProvider componentName="PatientMedicationsAll">
      <div className={cx(className, "ctw-scrollable-pass-through-height")}>
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
          viewOptions={{
            onChange: setViewOption,
            options: viewOptions,
            defaultView: past6Months,
          }}
        />
        <PatientResourceTable
          showTableHead
          isLoading={query.isLoading}
          data={data}
          columns={patientMedicationsAllColumns(userBuilderId)}
          onRowClick={openDetails}
          rowActions={readOnly ? undefined : rowActions}
          enableDismissAndReadActions
          emptyMessage={empty}
        />
      </div>
    </AnalyticsProvider>
  );
}

export const PatientMedicationsAll = withErrorBoundary(
  PatientMedicationsAllComponent,
  "PatientMedicationsAll"
);

function useRowActions(onAddToRecord?: (record: MedicationStatementModel) => void) {
  const { t } = useBaseTranslations();
  const userBuilderId = useUserBuilderId();
  const showAddMedicationForm = useAddMedicationForm();
  const { toggleRead } = useToggleRead();

  return (record: MedicationStatementModel): RowActionsConfigProp<MedicationStatementModel> =>
    record.ownedByBuilder(userBuilderId)
      ? []
      : [
          {
            text: t("resourceTable.add"),
            className: "ctw-btn-primary",
            onClick: () => {
              if (!record.isRead) {
                void toggleRead(record);
              }

              if (onAddToRecord) {
                onAddToRecord(record);
              } else {
                showAddMedicationForm(record);
              }
            },
          },
        ];
}

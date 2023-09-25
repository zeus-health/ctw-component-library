import { useAddMedicationForm } from "./helpers/add-new-med-drawer";
import { medicationFilters } from "./helpers/filters";
import { PatientMedicationsBase } from "./helpers/patient-medications-base";
import { useToggleDismiss } from "../hooks/use-toggle-dismiss";
import { getDateRangeView } from "../resource/helpers/view-date-range";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { useAnalytics } from "@/components/core/providers/analytics/use-analytics";
import { RowActionsConfigProp } from "@/components/core/table/table-rows";
import { MedicationStatementModel } from "@/fhir/models";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";
import { useBaseTranslations } from "@/i18n";
import { Spinner } from "@/index";
import { QUERY_KEY_BASIC, QUERY_KEY_OTHER_PROVIDER_MEDICATIONS } from "@/utils/query-keys";

export type PatientMedicationsOutsideProps = {
  className?: string;
  onOpenHistoryDrawer?: () => void;
  onAddToRecord?: (record: MedicationStatementModel) => Promise<void> | void;
  readOnly?: boolean;
};

const PatientMedicationsOutsideComponent = ({
  className,
  onAddToRecord,
  readOnly = false,
  onOpenHistoryDrawer,
}: PatientMedicationsOutsideProps) => {
  const { otherProviderMedications, isLoading } = useQueryAllPatientMedications();
  const rowActions = useRowActions(onAddToRecord);
  const { viewOptions, past6Months } =
    getDateRangeView<MedicationStatementModel>("lastActivityDate");

  return (
    <AnalyticsProvider componentName="PatientMedicationsOutside">
      <PatientMedicationsBase
        className={className}
        query={{ data: otherProviderMedications, isLoading }}
        filters={medicationFilters(otherProviderMedications, true)}
        rowActions={readOnly ? undefined : rowActions}
        views={viewOptions}
        defaultView={past6Months}
        onOpenHistoryDrawer={onOpenHistoryDrawer}
      />
    </AnalyticsProvider>
  );
};

export const PatientMedicationsOutside = withErrorBoundary(
  PatientMedicationsOutsideComponent,
  "PatientMedicationsOutside"
);

function useRowActions(onAddToRecord?: (record: MedicationStatementModel) => void) {
  const { t } = useBaseTranslations();
  const { trackInteraction } = useAnalytics();
  const showAddMedicationForm = useAddMedicationForm();
  const { isLoading, toggleDismiss: toggleArchive } = useToggleDismiss(
    QUERY_KEY_OTHER_PROVIDER_MEDICATIONS,
    QUERY_KEY_BASIC
  );

  return (record: MedicationStatementModel): RowActionsConfigProp<MedicationStatementModel> => {
    const archiveLabel = record.isDismissed
      ? t("resourceTable.restore")
      : t("resourceTable.dismiss");
    return [
      {
        text: archiveLabel,
        className: "ctw-btn-default",
        disabled: isLoading,
        onClick: async () => {
          await toggleArchive(record);
        },
        render() {
          return (
            <div className="ctw-flex">
              {isLoading && <Spinner className="ctw-mx-4 ctw-align-middle" />}
              {!isLoading && archiveLabel}
            </div>
          );
        },
      },
      {
        text: t("resourceTable.add"),
        className: "ctw-btn-primary ctw-ml-1 ctw-capitalize",
        testId: "add-to-record",
        disabled: isLoading,
        onClick: () => {
          if (onAddToRecord) {
            onAddToRecord(record);
          } else {
            showAddMedicationForm(record);
          }
          trackInteraction("add_to_record");
        },
      },
    ];
  };
}

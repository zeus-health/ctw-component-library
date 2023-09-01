import { useMemo } from "react";
import { useAddMedicationForm } from "./helpers/add-new-med-drawer";
import { medicationFilters } from "./helpers/filters";
import { PatientMedicationsBase } from "./helpers/patient-medications-base";
import { useToggleDismiss } from "../hooks/use-toggle-dismiss";
import { getDateRangeView } from "../resource/helpers/view-date-range";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { useAnalytics } from "@/components/core/providers/analytics/use-analytics";
import { RowActionsProps } from "@/components/core/table/table";
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
  const rowActions = useMemo(() => getRowActions({ onAddToRecord }), [onAddToRecord]);
  const { viewOptions, past6Months } =
    getDateRangeView<MedicationStatementModel>("lastActivityDate");

  return (
    <PatientMedicationsBase
      className={className}
      query={{ data: otherProviderMedications, isLoading }}
      filters={medicationFilters(otherProviderMedications, true)}
      rowActions={readOnly ? undefined : rowActions}
      views={viewOptions}
      defaultView={past6Months}
      onOpenHistoryDrawer={onOpenHistoryDrawer}
    />
  );
};

export const PatientMedicationsOutside = withErrorBoundary(
  PatientMedicationsOutsideComponent,
  "PatientMedicationsOutside"
);

type ExtraRowActionProps = {
  onAddToRecord?: (record: MedicationStatementModel) => void;
};

const getRowActions =
  ({ onAddToRecord }: ExtraRowActionProps) =>
  (props: RowActionsProps<MedicationStatementModel>) =>
    <RowActions {...props} onAddToRecord={onAddToRecord} />;

type RowActionsProps2 = RowActionsProps<MedicationStatementModel> & ExtraRowActionProps;

const RowActions = ({ record, onSuccess, onAddToRecord }: RowActionsProps2) => {
  const { t } = useBaseTranslations();
  const { trackInteraction } = useAnalytics();
  const showAddMedicationForm = useAddMedicationForm();
  const { isLoading, toggleDismiss: toggleArchive } = useToggleDismiss(
    QUERY_KEY_OTHER_PROVIDER_MEDICATIONS,
    QUERY_KEY_BASIC
  );
  const archiveLabel = record.isDismissed ? t("resourceTable.restore") : t("resourceTable.dismiss");

  return (
    <AnalyticsProvider componentName="PatientMedicationsOutside">
      <div className="ctw-flex ctw-space-x-2">
        <button
          type="button"
          className="ctw-btn-default"
          disabled={isLoading}
          onClick={async () => {
            await toggleArchive(record);
            onSuccess?.();
          }}
        >
          {isLoading ? (
            <div className="ctw-flex">
              <Spinner className="ctw-mx-4 ctw-align-middle" />
            </div>
          ) : (
            archiveLabel
          )}
        </button>

        <button
          type="button"
          className="ctw-btn-primary ctw-ml-1 ctw-capitalize"
          data-testid="add-to-record"
          disabled={isLoading}
          onClick={() => {
            if (onAddToRecord) {
              onAddToRecord(record);
              onSuccess?.();
            } else {
              showAddMedicationForm(record);
            }
            trackInteraction("btn_add_to_record");
          }}
        >
          {t("resourceTable.add")}
        </button>
      </div>
    </AnalyticsProvider>
  );
};

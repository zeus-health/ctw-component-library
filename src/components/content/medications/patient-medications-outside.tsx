import { useEffect } from "react";
import { useAddMedicationForm } from "./helpers/add-new-med-drawer";
import { medicationFilters } from "./helpers/filters";
import { PatientMedicationsBase } from "./helpers/patient-medications-base";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { RowActionsProps } from "@/components/core/table/table";
import { toggleArchive } from "@/fhir/basic";
import { MedicationStatementModel } from "@/fhir/models";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";
import { useCTW } from "@/index";
import { QUERY_KEY_OTHER_PROVIDER_MEDICATIONS } from "@/utils/query-keys";
import { Telemetry } from "@/utils/telemetry";

export type PatientMedicationsOutsideProps = {
  className?: string;
  onOpenHistoryDrawer?: () => void;
  onAddToRecord?: (record: MedicationStatementModel) => void;
  readOnly?: boolean;
};

const PatientMedicationsOutsideComponent = ({
  className,
  onAddToRecord,
  readOnly = false,
  onOpenHistoryDrawer,
}: PatientMedicationsOutsideProps) => {
  const { otherProviderMedications, isLoading } = useQueryAllPatientMedications();

  useEffect(() => {
    if (!isLoading) {
      Telemetry.reportZAPRecordCount("outside_medications", otherProviderMedications.length);
    }
  }, [isLoading, otherProviderMedications]);

  return (
    <PatientMedicationsBase
      className={className}
      query={{ data: otherProviderMedications, isLoading }}
      filters={medicationFilters(otherProviderMedications, true)}
      rowActions={readOnly ? undefined : getRowActions({ onAddToRecord })}
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

const RowActions = ({ record, onAddToRecord }: RowActionsProps2) => {
  const showAddMedicationForm = useAddMedicationForm();
  const { getRequestContext } = useCTW();

  return (
    <div className="ctw-flex ctw-space-x-2">
      <button
        type="button"
        className="ctw-btn-default"
        onClick={async () => {
          await toggleArchive(record, await getRequestContext(), [
            QUERY_KEY_OTHER_PROVIDER_MEDICATIONS,
          ]);
        }}
      >
        {record.isArchived ? "Restore" : "Dismiss"}
      </button>

      <button
        type="button"
        className="ctw-btn-primary ctw-ml-1 ctw-capitalize"
        data-zus-telemetry-click="Add to record"
        data-testid="add-to-record"
        onClick={() => {
          if (onAddToRecord) {
            onAddToRecord(record);
          } else {
            showAddMedicationForm(record);
          }
        }}
      >
        Add
      </button>
    </div>
  );
};
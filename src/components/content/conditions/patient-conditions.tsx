import {
  useAddConditionForm,
  useConfirmDeleteCondition,
  useEditConditionForm,
} from "./helpers/modal-hooks";
import { PatientConditionsBase } from "./helpers/patient-conditions-base";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { RowActionsProps } from "@/components/core/table/table";
import {
  usePatientConditions,
  usePatientConditionsOutside,
} from "@/fhir/conditions";
import { ConditionModel } from "@/fhir/models";
import { useBaseTranslations } from "@/i18n";
import { usePatientHistory } from "../patient-history/use-patient-history";

export type PatientConditionsProps = {
  className?: string;
  readOnly?: boolean;
};

const PatientConditionsComponent = ({
  className,
  readOnly = false,
}: PatientConditionsProps) => {
  const query = usePatientConditions();
  const showAddConditionForm = useAddConditionForm();
  const { t } = useBaseTranslations();

  const action = !readOnly && (
    <button
      type="button"
      className="ctw-btn-primary"
      onClick={() => showAddConditionForm()}
    >
      {t("resource.add", { resource: t("glossary:condition_one") })}
    </button>
  );

  return (
    <PatientConditionsBase
      action={action}
      className={className}
      query={query}
      readOnly={readOnly}
      rowActions={readOnly ? undefined : RowActions}
    />
  );
};

export const PatientConditions = withErrorBoundary(
  PatientConditionsComponent,
  "PatientConditions"
);

const RowActions = ({ record }: RowActionsProps<ConditionModel>) => {
  const showEditConditionForm = useEditConditionForm();
  const confirmDelete = useConfirmDeleteCondition();

  return (
    <div className="ctw-flex ctw-space-x-2">
      {!record.isDeleted && (
        <button
          type="button"
          className="ctw-btn-default"
          onClick={() => confirmDelete(record)}
        >
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
};

export function useHasOtherRecordData() {
  const query = usePatientConditionsOutside();
  const patientHistoryQuery = usePatientHistory();
  const noOtherRecords = query.data.length === 0;

  return {
    hasNoOutsideData:
      patientHistoryQuery.lastRetrievedAt === undefined && noOtherRecords,
    isLoading: query.isLoading || patientHistoryQuery.isLoading,
  };
}

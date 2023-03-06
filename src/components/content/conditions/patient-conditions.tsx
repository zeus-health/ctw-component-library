import {
  useAddConditionForm,
  useConfirmDeleteCondition,
  useEditConditionForm,
} from "./helpers/modal-hooks";
import { PatientConditionsBase } from "./helpers/patient-conditions-base";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { RowActionsProps } from "@/components/core/table/table";
import { usePatientConditions } from "@/fhir/conditions";
import { ConditionModel } from "@/fhir/models";

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

  const action = !readOnly && (
    <button
      type="button"
      className="ctw-btn-primary"
      onClick={() => showAddConditionForm()}
    >
      Add Condition
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

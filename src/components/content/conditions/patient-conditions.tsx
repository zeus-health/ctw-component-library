import {
  useAddConditionForm,
  useConfirmDeleteCondition,
  useEditConditionForm,
} from "./helpers/modal-hooks";
import { PatientConditionsBase } from "./helpers/patient-conditions-base";
import { RowActionsProps } from "@/components/core/table/table";
import { usePatientConditions } from "@/fhir/conditions";
import { ConditionModel } from "@/fhir/models";

export type PatientConditionsProps = {
  className?: string;
};

export const PatientConditions = ({ className }: PatientConditionsProps) => {
  const query = usePatientConditions();
  const showAddConditionForm = useAddConditionForm();

  return (
    <PatientConditionsBase
      query={query}
      className={className}
      action={
        <button
          type="button"
          className="ctw-btn-primary ctw-p-0"
          onClick={() => showAddConditionForm()}
        >
          Add Condition
        </button>
      }
      rowActions={RowActions}
    />
  );
};

const RowActions = ({ record }: RowActionsProps<ConditionModel>) => {
  const showEditConditionForm = useEditConditionForm();
  const confirmDelete = useConfirmDeleteCondition();

  return (
    <div className="ctw-flex ctw-space-x-2">
      {!record.isDeleted && (
        <button
          type="button"
          className="ctw-btn-default"
          onClick={(event) => {
            event.stopPropagation();
            confirmDelete(record);
          }}
        >
          Remove
        </button>
      )}

      <button
        type="button"
        className="ctw-btn-primary"
        onClick={(event) => {
          event.stopPropagation();
          showEditConditionForm(record);
        }}
      >
        Edit
      </button>
    </div>
  );
};

import {
  useAddConditionForm,
  useConfirmDeleteCondition,
  useEditConditionForm,
} from "./condition-hooks";
import { toggleArchive } from "@/fhir/conditions";
import { ConditionModel } from "@/fhir/models";
import { RowActionsProps, useCTW } from "@/index";

export const PatientConditionHoverActions = ({
  record,
}: RowActionsProps<ConditionModel>) => {
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

export const OtherProviderConditionHoverActions = ({
  record,
}: RowActionsProps<ConditionModel>) => {
  const showAddConditionForm = useAddConditionForm();
  const { getRequestContext } = useCTW();

  return (
    <div className="ctw-flex ctw-space-x-2">
      <button
        type="button"
        className="ctw-btn-default"
        onClick={async (event) => {
          event.stopPropagation();
          await toggleArchive(record, await getRequestContext());
        }}
      >
        {record.isArchived ? "Restore" : "Dismiss"}
      </button>

      <button
        type="button"
        className="ctw-btn-primary"
        onClick={(event) => {
          event.stopPropagation();
          showAddConditionForm(record);
        }}
      >
        Add
      </button>
    </div>
  );
};

import { onConditionDelete, toggleArchive } from "../conditions-helper";
import { useAddConditionForm, useEditConditionForm } from "./condition-drawers";
import { useConfirmDelete } from "@/components/core/providers/confirm-delete-provider";
import { ConditionModel } from "@/fhir/models";
import { RowActionsProps, useCTW } from "@/index";

export const PatientConditionHoverActions = ({
  record,
}: RowActionsProps<ConditionModel>) => {
  const { getRequestContext } = useCTW();
  const showEditConditionForm = useEditConditionForm();
  const { confirmDelete } = useConfirmDelete();

  return (
    <div className="ctw-flex ctw-space-x-2">
      <button
        type="button"
        className="ctw-btn-default"
        onClick={(event) => {
          event.stopPropagation();
          confirmDelete({
            resource: record.resource,
            resourceName: record.display ?? "unnamed condition",
            onDelete: async () => {
              const requestContext = await getRequestContext();
              await onConditionDelete(record.resource, requestContext);
            },
          });
        }}
      >
        Remove
      </button>

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
        {record.isArchived ? "Un-Archive" : "Archive"}
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

import { useEditUserForm } from "./modal-hooks";
import { UserModel } from "@/api/auth/models/users";
import { RowActionsProps } from "@/components/core/table/table";

export const RowActions = ({ record }: RowActionsProps<UserModel>) => {
  const showEditConditionForm = useEditUserForm();
  //   const confirmDelete = useConfirmDeleteCondition();

  return (
    <div className="ctw-flex ctw-space-x-2">
      {!record.isDeleted && (
        <button
          type="button"
          className="ctw-btn-default"
          onClick={() => console.warn("this needs implemented")}
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

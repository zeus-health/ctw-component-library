import { PlusIcon } from "@heroicons/react/outline";
import { useAddConditionForm } from "./condition-drawers";
import { Toggle } from "@/components/core/toggle";

export type PatientConditionsActionsProps = {
  hideAdd: boolean;
  onToggleShowHistoric: () => void;
};

export function PatientConditionsActions({
  hideAdd,
  onToggleShowHistoric,
}: PatientConditionsActionsProps) {
  const showAddConditionForm = useAddConditionForm();

  return (
    <div className="ctw-flex ctw-items-center ctw-justify-end ctw-space-x-2 ctw-border-0 ctw-border-t ctw-border-solid ctw-border-divider-light ctw-py-5 ctw-px-4">
      <Toggle
        name="historic"
        text="Show Historic"
        onChange={onToggleShowHistoric}
      />
      {!hideAdd && (
        <button
          type="button"
          className="ctw-btn-icon"
          onClick={() => showAddConditionForm()}
        >
          <PlusIcon className="ctw-h-4 ctw-w-4" />
        </button>
      )}
    </div>
  );
}

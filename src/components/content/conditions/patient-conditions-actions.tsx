import { PlusIcon } from "@heroicons/react/outline";
import { useAddConditionForm } from "./condition-hooks";
import { DropdownMenu } from "@/components/core/dropdown-menu";
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
    <div className="ctw-flex ctw-items-center ctw-justify-between ctw-border-0 ctw-border-t ctw-border-solid ctw-border-divider-light ctw-py-5 ctw-px-4">
      <div>
        <DropdownMenu menuItems={[{ name: "Hello" }]}>
          <button
            className="ctw-flex ctw-cursor-pointer ctw-items-center ctw-space-x-1 ctw-rounded-md ctw-border-none ctw-bg-transparent ctw-py-2 ctw-px-3 ctw-text-content-light hover:ctw-bg-bg-lighter"
            type="button"
          >
            <span>
              <PlusIcon className="ctw-h-3.5 ctw-w-3.5" />
            </span>

            <span>Add Filter</span>
          </button>
        </DropdownMenu>
      </div>
      <div className="ctw-flex ctw-items-center ctw-space-x-2 ">
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
    </div>
  );
}

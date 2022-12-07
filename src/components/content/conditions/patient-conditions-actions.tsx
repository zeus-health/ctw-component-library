import { PlusIcon } from "@heroicons/react/outline";
import { Toggle } from "@/components/core/toggle";

export type PatientConditionsActionsProps = {
  onToggleShowHistoric: () => void;
};

export function PatientConditionsActions({
  onToggleShowHistoric,
}: PatientConditionsActionsProps) {
  return (
    <div className="ctw-flex ctw-items-center ctw-justify-end ctw-space-x-2 ctw-border-0 ctw-border-t ctw-border-solid ctw-border-divider-light ctw-py-5 ctw-px-4">
      <Toggle
        name="historic"
        text="Show Historic"
        onChange={onToggleShowHistoric}
      />
      <button type="button" className="ctw-btn-icon">
        <PlusIcon className="ctw-h-4 ctw-w-4" />
      </button>
    </div>
  );
}

import { useAddConditionForm } from "./condition-hooks";
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

  return !hideAdd ? (
    <div className="ctw-flex ctw-items-center ctw-justify-end ctw-space-x-2 ctw-p-4">
      <Toggle name="historic" text="Historic" onChange={onToggleShowHistoric} />
      <button
        type="button"
        className="ctw-btn-primary"
        onClick={() => showAddConditionForm()}
      >
        Add Condition
      </button>
    </div>
  ) : (
    <div className="ctw-p-4" />
  );
}

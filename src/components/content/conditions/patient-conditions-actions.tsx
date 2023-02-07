import { useAddConditionForm } from "./condition-hooks";
import { FilterBar } from "@/components/core/filter-bar/filter-bar";

export type PatientConditionsActionsProps = {
  hideAdd: boolean;
};

export function PatientConditionsActions({
  hideAdd,
}: PatientConditionsActionsProps) {
  const showAddConditionForm = useAddConditionForm();

  return (
    <div className="ctw-flex ctw-items-center ctw-justify-end ctw-space-x-2 ctw-p-3">
      <FilterBar filters={filterItems} handleOnChange={setFilters} />
      {!hideAdd && (
        <button
          type="button"
          className="ctw-btn-primary"
          onClick={() => showAddConditionForm()}
        >
          Add Condition
        </button>
      )}
    </div>
  );
}

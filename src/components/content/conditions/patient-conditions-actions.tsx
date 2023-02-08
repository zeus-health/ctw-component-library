import { useAddConditionForm } from "./condition-hooks";
import { FilterBar } from "@/components/core/filter-bar/filter-bar";
import { FilterItem } from "@/components/core/filter-bar/filter-bar-types";

export type PatientConditionsActionsProps = {
  hideAdd: boolean;
  filterItems: FilterItem[];
};

export function PatientConditionsActions({
  filters,
  filterItems,
  setFilters,
  hideAdd,
}: PatientConditionsActionsProps) {
  const showAddConditionForm = useAddConditionForm();

  console.log("PatientConditionsActions filters", filters);
  console.log("PatientConditionsActions filterItems", filterItems);

  return (
    <div className="ctw-flex ctw-items-center ctw-justify-end ctw-space-x-2 ctw-p-3">
      <FilterBar
        filters={filterItems}
        handleOnChange={setFilters}
        defaultState={filters}
      />
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

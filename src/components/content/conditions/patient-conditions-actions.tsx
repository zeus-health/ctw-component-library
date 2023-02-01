import { PlusIcon } from "@heroicons/react/outline";
import { Fragment } from "react";
import { useAddConditionForm } from "./condition-hooks";
import { PatientConditionPill } from "./patient-condition-pill";
import {
  AddFilter,
  AvailableFilters,
  FILTER_MAP,
  FilterActions,
  Filters,
  FilterTypes,
} from "./patient-conditions-filters";
import { DropdownMenuAction } from "@/components/core/dropdown-action-menu";

export type PatientConditionsActionsProps = {
  hideAdd: boolean;
  filters: Filters;
  availableFilters: AvailableFilters;
  actions: FilterActions;
  updateFilters: (newFilters: Partial<Filters>) => void;
};

export function PatientConditionsActions({
  hideAdd,
  filters,
  availableFilters,
  updateFilters,
  actions,
}: PatientConditionsActionsProps) {
  const showAddConditionForm = useAddConditionForm();

  return (
    <div className="ctw-flex ctw-items-center ctw-justify-between ctw-border-0 ctw-border-t ctw-border-solid ctw-border-divider-light ctw-py-5">
      <div className="ctw-flex ctw-items-center ctw-space-x-1">
        {filters[filters.activeCollection] && (
          <PillWrapper
            availableFilters={availableFilters}
            actions={actions}
            updateFilters={updateFilters}
          />
        )}
        <AddFilter actions={actions} />
      </div>
      <div className="ctw-flex ctw-items-center ctw-space-x-2 ">
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

type PillWrapper = {
  availableFilters: AvailableFilters;
  actions: FilterActions;
  updateFilters: (newFilters: Partial<Filters>) => void;
};

const PillWrapper = ({
  availableFilters,
  actions,
  updateFilters,
}: PillWrapper) => (
  <>
    {availableFilters.map((item) =>
      Object.entries(item).map(([filterName, filters]) => (
        <Fragment key={filterName}>
          {filters.available.length > 0 && (
            <DropdownMenuAction
              options={{
                items: filters.available.map((filter) => ({
                  name: filter,
                  isSelected: filters.selected.includes(filter),
                })),
                onItemSelect: (e) => {
                  patientConditionActions();
                  actions.addToFilter(
                    filterName,
                    e.value ? "ADD" : "REMOVE",
                    e.name
                  );
                },
                type: "checkbox",
              }}
              pinnedActions={[
                {
                  name: "Remove Filter",
                  action: () => {
                    actions.removeFilter(filterName);
                  },
                },
              ]}
            >
              <PatientConditionPill
                title={FILTER_MAP[filterName]}
                items={filters.selected}
              />
            </DropdownMenuAction>
          )}
        </Fragment>
      ))
    )}
  </>
);

const patientConditionActions = (
  filters: FilterTypes,
  updateFilters: Partial<Filters>,
  actionType: string
) => {
  switch (actionType) {
    case "Add":
      return undefined;
    default:
      return undefined;
  }
};

// removeFilter: (filterName: keyof FilterTypes) =>
// updateFilters({
//   [filters.activeCollection]: { [filterName]: [] },
// }),
// clearFilters: () => updateFilters({ patient: {}, other: {} }),
// resetFilters: () => updateFilters({ ...DEFAULT_FILTER_STATE }),
// addToFilter: (
// filterName: keyof FilterTypes,
// filterType: "ADD" | "REMOVE",
// value: string
// ) => {
// let newValues = [...filters[filters.activeCollection][filterName]];
// switch (filterType) {
//   case "ADD":
//     newValues = [...newValues, value];
//     break;
//   case "REMOVE":
//     newValues = newValues.filter((item) => item !== value);
//     break;
//   default:
//     newValues = [];
// }

// updateFilters({
//   [filters.activeCollection]: { [filterName]: newValues },
// });

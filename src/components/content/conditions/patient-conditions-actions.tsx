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
} from "./patient-conditions-filters";
import {
  DropdownMenuAction,
  OptionsItem,
} from "@/components/core/dropdown-action-menu";

export type PatientConditionsActionsProps = {
  hideAdd: boolean;
  filters: Filters;
  availableFilters: AvailableFilters;
  actions: FilterActions;
};

export function PatientConditionsActions({
  hideAdd,
  filters,
  availableFilters,
  actions,
}: PatientConditionsActionsProps) {
  const showAddConditionForm = useAddConditionForm();

  return (
    <div className="ctw-flex ctw-items-center ctw-justify-between ctw-border-0 ctw-border-t ctw-border-solid ctw-border-divider-light ctw-py-5">
      <div className="ctw-flex ctw-items-center ctw-space-x-1">
        {filters[filters.activeCollection] && (
          <PillWrapper availableFilters={availableFilters} actions={actions} />
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
};

const PillWrapper = ({ availableFilters, actions }: PillWrapper) => (
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
              {filters.selected.length > 0 && (
                <PatientConditionPill
                  title={FILTER_MAP[filterName]}
                  items={filters.selected}
                />
              )}
            </DropdownMenuAction>
          )}
        </Fragment>
      ))
    )}
  </>
);

export type RadioSelectProps = {
  menuItem: OptionsItem;
  onClick: (clickedValue: any) => void;
};

export const RadioSelect = ({ menuItem, onClick }: RadioSelectProps) => (
  <div>
    <input
      type="checkbox"
      id={menuItem.name}
      name={menuItem.name}
      onClick={(e) => {
        const clickedValue = {
          name: e.target.value,
          value: e.target.checked,
        };
        onClick(clickedValue);
      }}
      value={menuItem.name}
      checked={menuItem.isSelected}
    />
    <label htmlFor={menuItem.name}> {menuItem.name}</label>
  </div>
);

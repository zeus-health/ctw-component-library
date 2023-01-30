import { PlusIcon } from "@heroicons/react/outline";
import { Fragment } from "react";
import { useAddConditionForm } from "./condition-hooks";
import { PatientConditionPill } from "./patient-condition-pill";
import {
  AddFilter,
  AvailableFilters,
  FilterActions,
  Filters,
} from "./patient-conditions-filters";
import { DropdownMenuAction } from "@/components/core/dropdown-action-menu";

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
              options={filters.available}
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
                  title={filterName}
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

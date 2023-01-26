import { PlusIcon } from "@heroicons/react/outline";
import { useAddConditionForm } from "./condition-hooks";
import { PatientConditionPill } from "./patient-condition-pill";
import {
  AddFilter,
  FilterActions,
  Filters,
} from "./patient-conditions-filters";
import { DropdownMenuAction } from "@/components/core/dropdown-action-menu";

export type PatientConditionsActionsProps = {
  hideAdd: boolean;
  filters: Filters;
  availableFilters: Record<string, unknown>;
  updateFilters: (newFilters: Partial<Filters>) => void;
  actions: FilterActions;
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
          <PillWrapper availableFilters={availableFilters} actions={actions} />
        )}
        <AddFilter updateFilters={updateFilters} />
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
  availableFilters: any;
  actions: FilterActions;
};

const PillWrapper = ({ availableFilters, actions }: PillWrapper) => (
  <>
    {availableFilters.map((item) =>
      Object.entries(item).map(([filterName, obj]) => (
        <DropdownMenuAction
          key={filterName}
          menuItems={obj.available.map((name) => ({ name })) || []}
          pinnedActions={[
            {
              name: "Remove Filter",
              action: () => {
                actions.removeFilter(filterName);
              },
            },
          ]}
        >
          {obj.selected.length > 0 && (
            <PatientConditionPill
              title={filterName}
              items={obj.selected || []}
            />
          )}
        </DropdownMenuAction>
      ))
    )}
  </>
);

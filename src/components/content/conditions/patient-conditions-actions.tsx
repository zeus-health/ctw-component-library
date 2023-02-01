import { PlusIcon } from "@heroicons/react/outline";
import { Fragment } from "react";
import { useAddConditionForm } from "./condition-hooks";
import { PatientConditionPill } from "./patient-condition-pill";
import {
  AddFilter,
  AvailableFilters,
  ConditionFilters,
  FILTER_MAP,
  FilterCollection,
  Filters,
} from "./patient-conditions-filters";
import { DropdownMenuAction } from "@/components/core/dropdown-action-menu";

export type PatientConditionsActionsProps = {
  hideAdd: boolean;
  filters: ConditionFilters;
  availableFilters: AvailableFilters;
  updateFilters: (newFilters: Partial<Filters>) => void;
  activeCollection: FilterCollection;
};

export function PatientConditionsActions({
  hideAdd,
  filters,
  availableFilters,
  updateFilters,
  activeCollection,
}: PatientConditionsActionsProps) {
  const showAddConditionForm = useAddConditionForm();

  return (
    <div className="ctw-flex ctw-items-center ctw-justify-between ctw-border-0 ctw-border-t ctw-border-solid ctw-border-divider-light ctw-py-5">
      <div className="ctw-flex ctw-items-center ctw-space-x-1">
        <PillWrapper
          availableFilters={availableFilters}
          updateFilters={updateFilters}
          filters={filters}
        />

        <AddFilter
          updateFilters={updateFilters}
          activeCollection={activeCollection}
          filters={filters}
        />
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
  filters: ConditionFilters;
  updateFilters: (newFilters: Partial<Filters>) => void;
};

const PillWrapper = ({
  availableFilters,
  filters,
  updateFilters,
}: PillWrapper) => (
  <>
    {availableFilters.map((item) =>
      Object.entries(item).map(([filterName, filterMap]) => (
        <Fragment key={filterName}>
          {filterMap.available.length > 0 && (
            <DropdownMenuAction
              options={{
                items: filterMap.available.map((filter) => ({
                  name: filter,
                  isSelected: filterMap.selected.includes(filter),
                })),
                onItemSelect: (e) => {
                  patientConditionActions(
                    filters,
                    updateFilters,
                    filterName,
                    e.name,
                    e.value ? "ADD" : "DELETE"
                  );
                },
                type: "checkbox",
              }}
              pinnedActions={[
                {
                  name: "Remove Filter",
                  action: () => {
                    patientConditionActions(
                      filters,
                      updateFilters,
                      filterName,
                      "",
                      "REMOVE"
                    );
                  },
                },
              ]}
            >
              {filters[filterName] && (
                <PatientConditionPill
                  title={FILTER_MAP[filterName]}
                  items={filterMap.selected}
                />
              )}
            </DropdownMenuAction>
          )}
        </Fragment>
      ))
    )}
  </>
);

const patientConditionActions = (
  filters: FilterTypes,
  updateFilters: (newFilters: Partial<Filters>) => void,
  filterName: string,
  value: string,
  actionType: string
) => {
  const newValues = filters[filterName] ? [...filters[filterName]] : [];

  switch (actionType) {
    case "ADD":
      updateFilters({ ...filters, [filterName]: [...newValues, value] });
      break;
    case "DELETE":
      updateFilters({
        ...filters,
        [filterName]: filters[filterName].filter((item) => item !== value),
      });
      break;
    case "REMOVE":
      updateFilters({ ...filters, [filterName]: null });
      break;
    default:
      break;
  }
};

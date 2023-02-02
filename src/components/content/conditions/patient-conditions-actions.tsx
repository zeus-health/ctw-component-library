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
} from "./patient-conditions-filters";
import { DropdownMenuAction } from "@/components/core/dropdown-action-menu";

export type PatientConditionsActionsProps = {
  hideAdd: boolean;
  filters: ConditionFilters | undefined;
  availableFilters: AvailableFilters;
  updateFilters: (newFilters: Partial<ConditionFilters>) => void;
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
  filters: ConditionFilters | undefined;
  updateFilters: (newFilters: Partial<ConditionFilters>) => void;
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
                  key: filter,
                  name: filter,
                  isSelected: filterMap.selected.includes(filter),
                })),
                onItemSelect: (e) => {
                  patientConditionActions(
                    filters,
                    updateFilters,
                    {
                      name: filterName as keyof ConditionFilters,
                      value: e.name,
                    },
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
                      { name: filterName as keyof ConditionFilters },
                      "REMOVE"
                    );
                  },
                },
              ]}
            >
              {filters?.[filterName as keyof ConditionFilters] && (
                <PatientConditionPill
                  title={FILTER_MAP[filterName as keyof ConditionFilters]}
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
  filters: ConditionFilters | undefined,
  updateFilters: (newFilters: ConditionFilters) => void,
  payload: { name: keyof ConditionFilters; value?: string },
  actionType: string
) => {
  const { name, value } = payload;
  const filterValues = filters?.[name] ?? [];
  const newValues = [...filterValues];

  switch (actionType) {
    case "ADD":
      updateFilters({ ...filters, [name]: [...newValues, value] });
      break;
    case "DELETE":
      updateFilters({
        ...filters,
        [name]: filterValues.filter((item) => item !== value),
      });
      break;
    case "REMOVE":
      updateFilters({ ...filters, [name]: null });
      break;
    default:
      break;
  }
};

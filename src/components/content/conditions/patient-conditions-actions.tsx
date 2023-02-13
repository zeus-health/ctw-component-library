import { ChevronDownIcon } from "@heroicons/react/outline";
import { PatientHistoryTableHeaderMessage } from "../patient-history/patient-history-table-header";
import { usePatientHistory } from "../patient-history/use-patient-history";
import { useAddConditionForm } from "./condition-hooks";
import { FilterCollection } from "./patient-conditions-filters";
import { Sort, SortOption } from "./patient-conditions-sort";
import { DropdownMenuAction } from "@/components/core/dropdown-action-menu";
import { FilterBar } from "@/components/core/filter-bar/filter-bar";
import {
  FilterChangeEvent,
  FilterItem,
} from "@/components/core/filter-bar/filter-bar-types";

export type PatientConditionsActionsProps = {
  hideAdd: boolean;
  sortOptions: SortOption[];
  updateSorts: (newSorts: Partial<Sort>) => void;
  activeCollection: FilterCollection;
  currentSorts: Sort;
  filterItems: FilterItem[];
  setFilters: (filterChangeEvent: FilterChangeEvent) => void;
  filters: FilterChangeEvent;
};

export function PatientConditionsActions({
  hideAdd,
  sortOptions,
  updateSorts,
  activeCollection,
  currentSorts,
  filterItems,
  setFilters,
  filters,
}: PatientConditionsActionsProps) {
  const showAddConditionForm = useAddConditionForm();
  const patientHistory = usePatientHistory();

  return (
    <div className="ctw-flex ctw-flex-wrap ctw-items-center ctw-justify-between ctw-p-3 sm:ctw-pt-1.5">
      <div className="ctw-flex ctw-flex-wrap ctw-gap-x-2">
        <SortButton
          options={sortOptions}
          updateSorts={updateSorts}
          activeCollection={activeCollection}
          currentSorts={currentSorts}
        />
        <FilterBar
          filters={filterItems}
          handleOnChange={setFilters}
          defaultState={filters}
        />
      </div>

      {patientHistory.lastRetrievedAt && hideAdd && (
        <PatientHistoryTableHeaderMessage
          patientHistory={patientHistory}
          message="Last Retrieved"
        />
      )}
      {!hideAdd && (
        <button
          type="button"
          className="ctw-btn-primary ctw-p-0"
          onClick={() => showAddConditionForm()}
        >
          Add Condition
        </button>
      )}
    </div>
  );
}

type SortButtonProps = {
  options: SortOption[];
  updateSorts: (newSorts: Partial<Sort>) => void;
  activeCollection: FilterCollection;
  currentSorts: Sort;
};

const SortButton = ({
  options,
  updateSorts,
  activeCollection,
  currentSorts,
}: SortButtonProps) => (
  <DropdownMenuAction
    type="select"
    buttonClassName="ctw-bg-transparent ctw-border-none ctw-p-0"
    onItemSelect={(event) => {
      const { dir, key, isDate } = options.filter(
        (option) => option.display === event.key
      )[0].payload;

      updateSorts({
        [activeCollection]: { key, dir, isDate, display: event.name },
      });
    }}
    items={options.map((option) => ({
      key: option.display,
      name: option.display,
      isSelected: currentSorts.display === option.display,
    }))}
  >
    <div className="ctw-btn-default ctw-flex ctw-items-center ctw-space-x-1">
      <span>Sort</span>
      <ChevronDownIcon className="ctw-h-4" />
    </div>
  </DropdownMenuAction>
);

import { ChevronDownIcon } from "@heroicons/react/outline";
import { PatientHistoryTableHeaderMessage } from "../patient-history/patient-history-table-header";
import { usePatientHistory } from "../patient-history/use-patient-history";
import { useAddConditionForm } from "./condition-hooks";
import { FilterCollection } from "./patient-conditions-filters";
import { Sort, SortOption } from "./patient-conditions-sort";
import { DropdownMenuAction } from "@/components/core/dropdown-action-menu";
import { Toggle } from "@/components/core/toggle";

export type PatientConditionsActionsProps = {
  hideAdd: boolean;
  onToggleShowHistoric: () => void;
  sortOptions: SortOption[];
  updateSorts: (newSorts: Partial<Sort>) => void;
  activeCollection: FilterCollection;
};

export function PatientConditionsActions({
  hideAdd,
  onToggleShowHistoric,
  sortOptions,
  updateSorts,
  activeCollection,
}: PatientConditionsActionsProps) {
  const showAddConditionForm = useAddConditionForm();
  const patientHistory = usePatientHistory();

  return (
    <div className="ctw-flex ctw-items-center  ctw-justify-between ctw-space-x-2 ctw-p-3">
      {patientHistory.lastRetrievedAt && hideAdd && (
        <PatientHistoryTableHeaderMessage
          patientHistory={patientHistory}
          message="Last Retrieved"
        />
      )}
      <div>
        <SortButton
          options={sortOptions}
          updateSorts={updateSorts}
          activeCollection={activeCollection}
        />
      </div>
      <div className="ctw-flex ctw-items-center ctw-space-x-2">
        <Toggle
          name="historic"
          text="Historic"
          onChange={onToggleShowHistoric}
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
    </div>
  );
}

type SortButtonProps = {
  options: SortOption[];
  updateSorts: (newSorts: Partial<Sort>) => void;
  activeCollection: FilterCollection;
};

const SortButton = ({
  options,
  updateSorts,
  activeCollection,
}: SortButtonProps) => (
  <DropdownMenuAction
    type="select"
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
    }))}
  >
    <button
      type="button"
      className="ctw-btn-default ctw-flex ctw-items-center ctw-space-x-1"
    >
      <span>Sort</span>
      <ChevronDownIcon className="ctw-h-4" />
    </button>
  </DropdownMenuAction>
);

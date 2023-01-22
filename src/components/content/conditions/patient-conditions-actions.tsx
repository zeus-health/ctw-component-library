import { PlusIcon } from "@heroicons/react/outline";
import { useAddConditionForm } from "./condition-hooks";
import { PatientConditionPill } from "./patient-condition-pill";
import { AddFilter, Filters2 } from "./patient-conditions-filters";
import { DropdownMenu } from "@/components/core/dropdown-menu";
import { ConditionModel } from "@/fhir/models";

export type PatientConditionsActionsProps = {
  hideAdd: boolean;
  filters: Filters2;
  conditions: ConditionModel[];
};

export const filterMap = {
  status: "displayStatus",
  category: "ccsChapter",
};

export function PatientConditionsActions({
  hideAdd,
  filters,
  conditions,
}: PatientConditionsActionsProps) {
  const showAddConditionForm = useAddConditionForm();
  const filtersToShow =
    filters.activeCollection === "patient"
      ? filters.patientFilters
      : filters.otherFilters;

  return (
    <div className="ctw-flex ctw-items-center ctw-justify-between ctw-border-0 ctw-border-t ctw-border-solid ctw-border-divider-light ctw-py-5 ctw-px-4">
      <div className="ctw-flex ctw-items-center ctw-space-x-1">
        {filtersToShow &&
          Object.entries(filtersToShow).map(([name, values]) => (
            <DropdownMenu
              menuItems={[filterMap[name]]}
              pinnedActions={[
                {
                  name: "Remove Filter",
                  action: () => {
                    console.log("hello");
                  },
                },
              ]}
            >
              <PatientConditionPill title={name} items={values} />
            </DropdownMenu>
          ))}

        <AddFilter />
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

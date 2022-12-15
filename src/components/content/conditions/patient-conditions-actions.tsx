import { PlusIcon } from "@heroicons/react/outline";
import { curry } from "lodash";
import { useState } from "react";
import {
  conditionAddSchema,
  getAddConditionData,
} from "../forms/schemas/condition-schema";
import { createOrEditCondition } from "../forms/actions/conditions";
import { DrawerFormWithFields } from "@/components/core/form/drawer-form-with-fields";
import { usePatient } from "@/components/core/patient-provider";
import { Toggle } from "@/components/core/toggle";
import { getNewCondition } from "@/fhir/conditions";
import { ConditionModel } from "@/fhir/models";

export type PatientConditionsActionsProps = {
  hideAdd: boolean;
  onToggleShowHistoric: () => void;
};

export function PatientConditionsActions({
  hideAdd,
  onToggleShowHistoric,
}: PatientConditionsActionsProps) {
  const patientResponse = usePatient();
  const patientId = patientResponse.data?.id ?? "";
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);

  const newCondition = new ConditionModel(getNewCondition(patientId));
  const newConditionData = getAddConditionData({
    condition: newCondition,
  });
  const handleAddAction = curry(createOrEditCondition)(newCondition, patientId);

  return (
    <div className="ctw-flex ctw-items-center ctw-justify-end ctw-space-x-2 ctw-border-0 ctw-border-t ctw-border-solid ctw-border-divider-light ctw-py-5 ctw-px-4">
      <Toggle
        name="historic"
        text="Show Historic"
        onChange={onToggleShowHistoric}
      />
      {!hideAdd && (
        <button
          type="button"
          className="ctw-btn-icon"
          onClick={() => setIsAddDrawerOpen(true)}
        >
          <PlusIcon className="ctw-h-4 ctw-w-4" />
        </button>
      )}

      <DrawerFormWithFields
        title="Add Condition"
        action={handleAddAction}
        data={newConditionData}
        schema={conditionAddSchema}
        isOpen={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
      />
    </div>
  );
}

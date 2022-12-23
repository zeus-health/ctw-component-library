import type { ConditionFormData } from "./patient-conditions";
import { PlusIcon } from "@heroicons/react/outline";
import { curry } from "lodash";
import { Dispatch, SetStateAction, useState } from "react";
import {
  createOrEditCondition,
  getAddConditionWithDefaults,
} from "../forms/actions/conditions";
import {
  conditionAddSchema,
  conditionEditSchema,
  getAddConditionData,
  getEditingPatientConditionData,
} from "../forms/schemas/condition-schema";
import { CTWRequestContext } from "@/components/core/ctw-context";
import { DrawerFormWithFields } from "@/components/core/form/drawer-form-with-fields";
import { usePatient } from "@/components/core/patient-provider";
import { Toggle } from "@/components/core/toggle";
import { recordProfileAction } from "@/fhir/basic";
import { getNewCondition } from "@/fhir/conditions";
import { ConditionModel } from "@/fhir/models";
import { QUERY_KEY_OTHER_PROVIDER_CONDITIONS } from "@/utils/query-keys";
import { queryClient } from "@/utils/request";

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

export const handleAddOtherProviderCondition = (
  condition: ConditionModel,
  updateFormProps: React.Dispatch<Partial<ConditionFormData>>
) => {
  const newCondition = getAddConditionWithDefaults(condition.resource);
  updateFormProps({
    drawerIsOpen: true,
    actionType: "Add",
    schema: conditionAddSchema,
    data: getAddConditionData({
      condition: new ConditionModel(newCondition),
    }),
  });
};

export const handleEditCondition = (
  condition: ConditionModel,
  setSelectedCondition: React.Dispatch<
    React.SetStateAction<ConditionModel | undefined>
  >,
  updateFormProps: React.Dispatch<Partial<ConditionFormData>>
) => {
  updateFormProps({
    drawerIsOpen: true,
    actionType: "Edit",
    schema: conditionEditSchema,
    data: getEditingPatientConditionData({ condition }),
  });
  setSelectedCondition(condition);
};

export const handleConditionDelete = (
  condition: ConditionModel,
  setSelectedCondition: React.Dispatch<
    React.SetStateAction<ConditionModel | undefined>
  >,
  setShowConfirmDelete: Dispatch<SetStateAction<boolean>>
) => {
  setShowConfirmDelete(true);
  setSelectedCondition(condition);
};

export const handleToggleArchive = async (
  condition: ConditionModel,
  getRequestContext: () => Promise<CTWRequestContext>
) => {
  const requestContext = await getRequestContext();
  const existingBasic =
    condition.getBasicResourceByAction("archive") ||
    condition.getBasicResourceByAction("unarchive");
  const profileAction = condition.isArchived ? "unarchive" : "archive";

  await recordProfileAction(
    existingBasic,
    condition,
    requestContext,
    profileAction
  );

  // Refresh our data (this is really just needed to update
  // otherProviderRecord state).
  await queryClient.invalidateQueries([QUERY_KEY_OTHER_PROVIDER_CONDITIONS]);
};

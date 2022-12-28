import { curry } from "lodash";
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
import { usePatient } from "@/components/core/patient-provider";
import { useDrawerFormWithFields } from "@/components/core/providers/drawer-form-with-fields-provider";
import { getNewCondition } from "@/fhir/conditions";
import { ConditionModel } from "@/index";

export function useAddConditionForm() {
  const { showFormDrawer } = useDrawerFormWithFields();
  const patientResponse = usePatient();
  const patientId = patientResponse.data?.id ?? "";

  return (condition?: ConditionModel) => {
    const conditionData = condition
      ? getAddConditionWithDefaults(condition.resource)
      : getNewCondition(patientId);
    const newCondition = new ConditionModel(conditionData);

    showFormDrawer({
      title: "Add Condition",
      schema: conditionAddSchema,
      action: curry(createOrEditCondition)(newCondition, patientId),
      data: getAddConditionData({ condition: newCondition }),
    });
  };
}

export function useEditConditionForm() {
  const { showFormDrawer } = useDrawerFormWithFields();
  const patientResponse = usePatient();
  const patientId = patientResponse.data?.id ?? "";

  return (condition: ConditionModel) => {
    showFormDrawer({
      title: "Edit Condition",
      schema: conditionEditSchema,
      action: curry(createOrEditCondition)(condition, patientId),
      data: getEditingPatientConditionData({ condition }),
    });
  };
}

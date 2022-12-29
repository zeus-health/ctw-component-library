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
import { DrawerFormWithFields } from "@/components/core/form/drawer-form-with-fields";
import { usePatient } from "@/components/core/patient-provider";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { getNewCondition } from "@/fhir/conditions";
import { ConditionModel } from "@/index";

export function useAddConditionForm() {
  const { openDrawer } = useDrawer();
  const patientResponse = usePatient();
  const patientId = patientResponse.data?.id ?? "";

  return (referenceCondition?: ConditionModel) => {
    const condition = new ConditionModel(
      referenceCondition
        ? getAddConditionWithDefaults(referenceCondition.resource)
        : getNewCondition(patientId)
    );

    openDrawer({
      component: (props) => (
        <DrawerFormWithFields
          title="Add Condition"
          schema={conditionAddSchema}
          action={curry(createOrEditCondition)(condition, patientId)}
          data={getAddConditionData({ condition })}
          {...props}
        />
      ),
    });
  };
}

export function useEditConditionForm() {
  const { openDrawer } = useDrawer();
  const patientResponse = usePatient();
  const patientId = patientResponse.data?.id ?? "";

  return (condition: ConditionModel) => {
    openDrawer({
      component: (props) => (
        <DrawerFormWithFields
          title="Edit Condition"
          schema={conditionEditSchema}
          action={curry(createOrEditCondition)(condition, patientId)}
          data={getEditingPatientConditionData({ condition })}
          {...props}
        />
      ),
    });
  };
}

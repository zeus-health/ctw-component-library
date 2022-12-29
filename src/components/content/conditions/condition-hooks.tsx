import { curry } from "lodash";
import { onConditionDelete } from "../conditions-helper";
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
import { ModalConfirmDelete } from "@/components/core/modal-confirm-delete";
import { usePatient } from "@/components/core/patient-provider";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { useModal } from "@/components/core/providers/modal-provider";
import { getNewCondition } from "@/fhir/conditions";
import { ConditionModel, useCTW } from "@/index";
import { ConditionHeader } from "../condition-header";

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
          header={<ConditionHeader condition={condition} />}
          schema={conditionEditSchema}
          action={curry(createOrEditCondition)(condition, patientId)}
          data={getEditingPatientConditionData({ condition })}
          {...props}
        />
      ),
    });
  };
}

export function useConfirmDeleteCondition() {
  const { openModal } = useModal();
  const { getRequestContext } = useCTW();

  return (condition: ConditionModel) => {
    openModal({
      component: (props) => (
        <ModalConfirmDelete
          resource={condition.resource}
          resourceName={condition.display ?? "unnamed condition"}
          onDelete={async () => {
            const requestContext = await getRequestContext();
            await onConditionDelete(condition.resource, requestContext);
          }}
          {...props}
        />
      ),
    });
  };
}

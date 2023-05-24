import { ConditionHeader } from "./condition-header";
import { createOrEditCondition, getAddConditionWithDefaults } from "../../forms/actions/conditions";
import {
  conditionAddSchema,
  conditionEditSchema,
  getAddConditionData,
  getEditingPatientConditionData,
} from "../../forms/schemas/condition-schema";
import { DrawerFormWithFields } from "@/components/core/form/drawer-form-with-fields";
import { ModalConfirmDelete } from "@/components/core/modal-confirm-delete";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { useModal } from "@/components/core/providers/modal-provider";
import { usePatient } from "@/components/core/providers/patient-provider";
import { useCTW } from "@/components/core/providers/use-ctw";
import { ConditionModel } from "@/fhir/models";
import { getNewCondition } from "@/fhir/models/condition";
import { useBaseTranslations } from "@/i18n";
import { deleteCondition } from "@/services/conditions";
import { curry } from "@/utils/nodash";

export function useAddConditionForm() {
  const { t } = useBaseTranslations();
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
          title={t("resource.add", { resource: t("glossary:condition_one") })}
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
  const { t } = useBaseTranslations();
  const { openDrawer } = useDrawer();
  const patientResponse = usePatient();
  const patientId = patientResponse.data?.id ?? "";

  return (condition: ConditionModel) => {
    openDrawer({
      component: (props) => (
        <DrawerFormWithFields
          title={t("resource.edit", { resource: t("glossary:condition_one") })}
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
  const { t } = useBaseTranslations();
  const { openModal } = useModal();
  const { getRequestContext } = useCTW();

  return (condition: ConditionModel, onDelete?: (condition: ConditionModel) => void) => {
    const name =
      condition.display ??
      t("resource.unnamed", {
        resource: t("glossary:condition_one"),
      });

    openModal({
      component: (props) => (
        <ModalConfirmDelete
          resource={t("glossary:condition_one")}
          resourceName={name}
          onDelete={async () => {
            const requestContext = await getRequestContext();
            await deleteCondition(condition.resource, requestContext);
            onDelete?.(condition);
          }}
          {...props}
        />
      ),
    });
  };
}

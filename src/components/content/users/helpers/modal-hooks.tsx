import { t } from "i18next";
import { curry } from "lodash";
import { createOrEditCondition, getAddConditionWithDefaults } from "../../forms/actions/conditions";
import { conditionAddSchema, getAddConditionData } from "../../forms/schemas/condition-schema";
import { DrawerFormWithFields } from "@/components/core/form/drawer-form-with-fields";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { getNewCondition } from "@/fhir/conditions";
import { ConditionModel } from "@/fhir/models";

export function useAddUserForm() {
  const { openDrawer } = useDrawer();

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

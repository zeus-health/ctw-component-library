import { t } from "i18next";
import { createOrEditCondition, getAddConditionWithDefaults } from "../../forms/actions/conditions";
import { editUserPermissions } from "../../forms/actions/user";
import {
  conditionAddSchema,
  conditionEditSchema,
  getAddConditionData,
} from "../../forms/schemas/condition-schema";
import { getEditingUserData } from "../../forms/schemas/user-schema";
import { UserModel } from "@/api/auth/models/users";
import { useAuthRoles } from "@/api/auth/queries/auth";
import { DrawerFormWithFields } from "@/components/core/form/drawer-form-with-fields";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { getNewCondition } from "@/fhir/conditions";
import { ConditionModel } from "@/fhir/models";
import { curry } from "@/utils/nodash";

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

export function useEditUserForm() {
  const { openDrawer } = useDrawer();
  const authRoles = useAuthRoles();
  console.log("auth ROles", authRoles);

  return (user: UserModel) => {
    openDrawer({
      component: (props) => (
        <DrawerFormWithFields
          title="Edit User"
          schema={conditionEditSchema}
          action={editUserPermissions}
          data={getEditingUserData({ user, authRoles })}
          {...props}
        />
      ),
    });
  };
}

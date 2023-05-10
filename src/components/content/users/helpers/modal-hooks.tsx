import { createUser, editUserPermissions } from "../../forms/actions/user";
import { conditionEditSchema } from "../../forms/schemas/condition-schema";
import { getAddUserData, getEditingUserData, userSchema } from "../../forms/schemas/user-schema";
import { UserModel } from "@/api/auth/models/users";
import { useAuthRoles } from "@/api/auth/queries/auth";
import { DrawerFormWithFields } from "@/components/core/form/drawer-form-with-fields";
import { useDrawer } from "@/components/core/providers/drawer-provider";

export function useAddUserForm() {
  const { openDrawer } = useDrawer();

  return (user: UserModel) => {
    openDrawer({
      component: (props) => (
        <DrawerFormWithFields
          title="Add User"
          schema={userSchema}
          action={createUser}
          data={getAddUserData({ user })}
          {...props}
        />
      ),
    });
  };
}

export function useEditUserForm() {
  const { openDrawer } = useDrawer();
  const authRoles = useAuthRoles();

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

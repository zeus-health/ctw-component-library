import { createOrEditUser } from "../../forms/actions/users";
import { getAddUserData, getAddUserData, userSchema } from "../../forms/schemas/user-schema";
import { UserModel } from "@/api/auth/models/users";
import { DrawerFormWithFields } from "@/components/core/form/drawer-form-with-fields";
import { useDrawer } from "@/components/core/providers/drawer-provider";

export function useAddUserForm() {
  const { openDrawer } = useDrawer();

  const user = new UserModel({});

  return () => {
    openDrawer({
      component: (props) => (
        <DrawerFormWithFields
          title="Add User"
          schema={userSchema}
          action={curry(createOrEditUser)(user)}
          data={getAddUserData()}
          {...props}
        />
      ),
    });
  };
}

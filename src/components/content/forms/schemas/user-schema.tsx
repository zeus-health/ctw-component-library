import { UserModel } from "@/api/auth/models/users";
import { FormEntry } from "@/components/core/form/drawer-form-with-fields";

export const getEditingUserData = ({ user, authRoles }: { user: UserModel }): FormEntry[] => [
  {
    label: "id",
    value: user.key,
    field: "id",
    readonly: true,
    hidden: true,
  },
  {
    label: "User Role",
    value: user.key,
    field: "id",
    readonly: true,
    hidden: true,
  },
];

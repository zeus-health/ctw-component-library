import { z } from "zod";
import { UserModel } from "@/api/auth/models/users";
import { FormEntry } from "@/components/core/form/drawer-form-with-fields";

export const getAddUserData = ({ user }: { user: UserModel }): FormEntry[] => [
  {
    label: "email",
    field: "email",
  },
  {
    label: "name",
    field: "name",
  },
  {
    label: "userType",
    field: "userType",
  },
  {
    label: "role",
    value: "test",
    field: "role",
  },
  {
    label: "builderId",
    field: "builderId",
  },
];

export const getEditingUserData = ({
  user,
}: {
  user: UserModel;
  authRoles?: string[];
}): FormEntry[] => [
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

export const userSchema = z.object({
  email: z.string({ required_error: "Email is required." }),
  name: z.string({ required_error: "Name is required." }),
  userType: z.enum(["zus", "builder", "individual"]),
  role: z.enum(["Builder Admin", "Care Team User"]),
  builderId: z.string({ required_error: "Builder ID is required." }),
});

import type { FormEntry } from "../../../core/form/drawer-form-with-fields";
import { z } from "zod";
import { UserModel } from "@/api/auth/models/users";

export const getAddUserData = (): FormEntry[] => [
  {
    label: "Name",
    value: "",
    field: "name",
  },
  {
    label: "Email",
    value: "",
    field: "email",
  },

  {
    label: "Role",
    value: "",
    field: "role",
  },
];

export const getEditUserData = ({ user }: { user: UserModel }): FormEntry[] => [
  {
    label: "id",
    value: user.id,
    field: "id",
    readonly: true,
    hidden: true,
  },
  {
    label: "Name",
    value: user.name,
    field: "name",
  },
  {
    label: "Email",
    value: user.email,
    field: "email",
  },

  {
    label: "Role",
    value: user.role,
    field: "role",
  },
];

export const userSchema = z.object({
  id: z.string().optional(),
  role: z.string(),
  name: z.string(),
  email: z.string(),
});

import { CreateOrEditConditionFormData } from "./conditions";
import { UserModel } from "@/api/auth/models/users";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";

export const createOrEditUser = async (
  user: UserModel | undefined,
  data: CreateOrEditConditionFormData,
  getRequestContext: () => Promise<CTWRequestContext>
): Promise<unknown> =>
  // TODO - call auth API client function to create or edit user
  Promise.resolve();

export type CreateOrEditUserFormData = {
  id?: string;
  roleId: string;
  name: string;
  email: string;
};

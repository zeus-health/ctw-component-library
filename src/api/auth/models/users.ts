import { User } from "../../../services/auth/users";

export class UserModel {
  kind = "User" as const;

  user: User;

  constructor(user: User) {
    this.user = user;
  }

  get key() {
    return this.user.id || "";
  }

  get name() {
    return this.user.attributes.name;
  }
}

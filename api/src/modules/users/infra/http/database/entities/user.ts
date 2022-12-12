import { users } from "@prisma/client";

export interface IUser extends users {
  parent?: IUser;
}

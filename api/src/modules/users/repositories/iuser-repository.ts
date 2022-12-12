import { ICreateUserDTO } from "../dtos/icreate-user-dto";
import { IUser } from "../infra/http/database/entities/user";

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<IUser>;
  findUserByField(
    field: string,
    value: string,
    showPassword?: boolean
  ): Promise<IUser | null>;
}

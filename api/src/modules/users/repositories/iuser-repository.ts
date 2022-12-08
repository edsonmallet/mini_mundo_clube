import { ICreateUserDTO } from "../dtos/icreate-user-dto";
import { IUpdateUserDTO } from "../dtos/iupdate-user-dto";
import { IUser } from "../infra/http/database/entities/user";

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<IUser>;
  update(uuid: string, data: IUpdateUserDTO): Promise<IUser>;
  delete(uuid: string): Promise<IUser>;
  findUserByUuid(uuid: string, showPassword: boolean): Promise<IUser | null>;
  findUserByField(
    field: string,
    value: string,
    showPassword?: boolean
  ): Promise<IUser | null>;
}

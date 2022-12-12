import { ICreateUserDTO } from "../dtos/icreate-user-dto";
import { IUser } from "../infra/http/database/entities/user";

export interface IUserRepository {
  update(uuid: string, data: ICreateUserDTO): Promise<IUser>;
  findUser(document: string, birthDate: string | Date): Promise<IUser | null>;
  findUserByUuid(uuid: string): Promise<IUser | null>;
}

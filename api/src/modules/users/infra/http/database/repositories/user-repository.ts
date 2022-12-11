import querys from "@/config/querys";
import { ICreateUserDTO } from "@/modules/users/dtos/icreate-user-dto";
import { IUpdateUserDTO } from "@/modules/users/dtos/iupdate-user-dto";
import { IUserRepository } from "@/modules/users/repositories/iuser-repository";
import { dbCore } from "@/shared/infra/http/database/core.server";
import { IUser } from "../entities/user";

export default class UserRepository implements IUserRepository {
  findUserByEmail(email: string, showPassword: boolean): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
  public async create(data: ICreateUserDTO): Promise<IUser> {
    const user = await dbCore.users.create({
      data,
      select: {
        uuid: true,
        email: true,
        name: true,
        document: true,
      },
    });

    return user;
  }

  public async update(uuid: string, data: IUpdateUserDTO): Promise<IUser> {
    const user = await dbCore.users.update({
      where: {
        uuid,
      },
      data,
      select: {
        uuid: true,
        name: true,
        email: true,
        document: true,
      },
    });

    return user;
  }

  public async delete(userUuid: string): Promise<IUser> {
    const user = await dbCore.users.delete({
      where: {
        uuid: userUuid,
      },
      select: {
        uuid: true,
        email: true,
        name: true,
        document: true,
      },
    });

    return user;
  }

  public async findUserByUuid(
    userUuid: string,
    showPassword = false
  ): Promise<IUser | null> {
    const user = await dbCore.users.findUnique({
      where: {
        uuid: userUuid,
      },
      select: {
        uuid: true,
        email: true,
        name: true,
        document: true,
        password: showPassword,
      },
    });

    return user;
  }

  public async findUserByField(
    field: string,
    value: string,
    showPassword = false
  ): Promise<IUser | null> {
    const user = await dbCore.users.findUnique({
      where: {
        [field]: value,
      },
      select: {
        uuid: true,
        email: true,
        name: true,
        document: true,
        password: showPassword,
      },
    });

    return user;
  }
}

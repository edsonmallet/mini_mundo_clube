import { ICreateUserDTO } from "@/modules/users/dtos/icreate-user-dto";
import { IUserRepository } from "@/modules/users/repositories/iuser-repository";
import { dbCore } from "@/shared/infra/http/database/core.server";
import { users } from "@prisma/client";
import { IUser } from "../entities/user";

export default class UserRepository implements IUserRepository {
  public async findUserByUuid(uuid: string): Promise<users> {
    const user = await dbCore.users.findUnique({
      where: {
        uuid,
      },
    });

    return user;
  }
  public async update(uuid: string, data: ICreateUserDTO): Promise<IUser> {
    const user = await dbCore.users.update({
      where: {
        uuid: uuid,
      },
      data,
      include: {
        parents: {
          select: {
            uuid: true,
            name: true,
            document: true,
            birthDate: true,
            isActivated: true,
            registerDate: true,
          },
        },
        companies: {
          select: {
            uuid: true,
            name: true,
            fancyName: true,
            corporateName: true,
            document: true,
          },
        },
        wallets: {
          select: {
            textContract: true,
            version: true,
            walletsBeneficts: {
              select: {
                realDiscount: true,
                beneficts: {
                  select: {
                    name: true,
                    slug: true,
                    description: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return user;
  }

  public async findUser(
    document: string,
    birthDate: string | Date
  ): Promise<IUser | null> {
    let user = await dbCore.users.findUnique({
      where: {
        document,
        birthDate: { lte: birthDate + "T23:59:59.999Z" },
      },
      include: {
        parents: {
          select: {
            uuid: true,
            name: true,
            document: true,
            birthDate: true,
            isActivated: true,
            registerDate: true,
          },
        },
        companies: {
          select: {
            uuid: true,
            name: true,
            fancyName: true,
            corporateName: true,
            document: true,
          },
        },
        wallets: {
          select: {
            textContract: true,
            version: true,
            walletsBeneficts: {
              select: {
                realDiscount: true,
                beneficts: {
                  select: {
                    name: true,
                    slug: true,
                    description: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return user;
  }
}

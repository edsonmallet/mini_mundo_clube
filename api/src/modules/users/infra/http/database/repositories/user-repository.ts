import querys from '@/config/querys'
import { ICreateUserCustomFieldDTO } from '@/modules/users/dtos/icreate-user-custom-field-dto'
import { ICreateUserDTO } from '@/modules/users/dtos/icreateuser-dto'
import { IImportUserDTO } from '@/modules/users/dtos/iimport-users-dto copy'
import { IUpdateUserCustomFieldDTO } from '@/modules/users/dtos/iupdate-user-custom-field-dto'
import { IUpdateUserDTO } from '@/modules/users/dtos/iupdateuser-dto'
import { IUserRepository } from '@/modules/users/repositories/iuser-repository'
import { dbCore } from '@/shared/infra/http/database/core.server'
import { userRoles } from '@prisma/client'
import slug from 'limax'
import { IUser } from '../entities/user'
import { IUserCustomField } from '../entities/userCustomFileld'

export default class UserRepository implements IUserRepository {
  private select = {
    uuid: true,
    email: true,
    firstName: true,
    lastName: true,
    role: true,
    document: true,
    registry: true,
    avatarUrl: true,
    companyUuid: true
  }

  public async getAllUsersByCompanyUuid(
    companyUuid: string,
    perPage: string = querys.perPage,
    page: string = querys.defaultPage,
    orderBy: string[],
    filterBy: string[]
  ): Promise<{ users: IUser[]; totalPages: number }> {
    const filterJson: object[] = []
    const orderByJson: object[] = []
    const whereJson = { companyUuid }

    if (filterBy) {
      filterBy.map(filter => {
        filterJson.push({
          [filter.split('|')[0]]: {
            contains: `${filter.split('|')[1]}`
          }
        })
      })
      whereJson['OR'] = filterJson
    }

    if (orderBy) {
      orderBy?.map(item => {
        orderByJson.push({ [item.split('|')[0]]: `${item.split('|')[1]}` })
      })
    }

    orderByJson.push({ createdAt: 'desc' })

    const totalUsers = await dbCore.users.count({ where: whereJson })

    const users = await dbCore.users.findMany({
      where: { ...whereJson, NOT: { role: 'master' } },
      select: this.select,
      orderBy: orderByJson,
      take: Number(perPage),
      skip: (Number(page) - 1) * Number(perPage)
    })

    return { users, totalPages: Math.ceil(totalUsers / Number(perPage)) }
  }

  public async findUserByField(
    field: string,
    value: string,
    showPassword = false
  ): Promise<IUser> {
    const user = await dbCore.users.findFirst({
      where: {
        [field]: value
      },
      select: {
        ...this.select,
        password: showPassword,
        company: { select: { logoUrl: true } }
      }
    })

    return user
  }

  public async create(data: ICreateUserDTO): Promise<IUser> {
    data.slug = slug(`${data.firstName} ${data.lastName}`)

    const user = await dbCore.users.create({
      data,
      select: this.select
    })

    return user
  }

  public async update(uuid: string, data: IUpdateUserDTO): Promise<IUser> {
    if (data.firstName && data.lastName)
      data.slug = slug(`${data.firstName} ${data.lastName}`)
    const user = await dbCore.users.update({
      where: {
        uuid
      },
      data,
      select: {
        uuid: true,
        firstName: true,
        lastName: true,
        role: true,
        email: true,
        document: true,
        registry: true,
        avatarUrl: true,
        profileGroup: {
          select: {
            uuid: true,
            name: true,
            parent: {
              select: {
                uuid: true,
                name: true
              }
            }
          }
        }
      }
    })

    return user
  }

  public async delete(userUuid: string): Promise<IUser> {
    const user = await dbCore.users.delete({
      where: {
        uuid: userUuid
      },
      select: this.select
    })

    return user
  }

  public async findUserByUuid(
    userUuid: string,
    showPassword = false
  ): Promise<IUser | null> {
    const user = await dbCore.users.findUnique({
      where: {
        uuid: userUuid
      },
      select: { ...this.select, password: showPassword }
    })

    return user
  }

  public async findAll(companyUuid: string): Promise<IUser[]> {
    const users = await dbCore.users.findMany({
      where: { companyUuid }
    })

    return users
  }

  public async getAllUsersWithProfileGroupByCompanyUuid(
    companyUuid: string,
    perPage: string = querys.perPage,
    page: string = querys.defaultPage,
    orderBy: string[],
    filterBy: string[]
  ): Promise<{ users: IUser[]; totalPages: number }> {
    const filterJson: object[] = []
    const orderByJson: object[] = []
    const whereJson = { companyUuid }

    if (filterBy) {
      filterBy.map(filter => {
        filterJson.push({
          [filter.split('|')[0]]: {
            contains: `${filter.split('|')[1]}`
          }
        })
      })
      whereJson['OR'] = filterJson
    }

    if (orderBy) {
      orderBy?.map(item => {
        orderByJson.push({ [item.split('|')[0]]: `${item.split('|')[1]}` })
      })
    }

    orderByJson.push({ createdAt: 'desc' })

    const totalUsers = await dbCore.users.count({
      where: { ...whereJson, NOT: { role: 'master' } }
    })

    const users = await dbCore.users.findMany({
      where: { ...whereJson, NOT: { role: 'master' } },
      orderBy: orderByJson,
      take: Number(perPage),
      skip: (Number(page) - 1) * Number(perPage),
      select: {
        uuid: true,
        firstName: true,
        lastName: true,
        role: true,
        email: true,
        document: true,
        registry: true,
        avatarUrl: true,
        profileGroup: {
          select: {
            uuid: true,
            name: true,
            parent: {
              select: {
                uuid: true,
                name: true
              }
            }
          }
        }
      }
    })

    return { users, totalPages: Math.ceil(totalUsers / Number(perPage)) }
  }

  public async findAllUsersCustomFields(
    companyUuid: string
  ): Promise<IUserCustomField[]> {
    const usersCustomFields = await dbCore.usersCustomFields.findMany({
      where: { companyUuid },
      select: {
        uuid: true,
        name: true,
        type: true,
        showInProfileReports: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return usersCustomFields
  }

  public async findUserCustomFieldByUuid(
    companyUuid: string,
    uuid: string
  ): Promise<IUserCustomField> {
    const usersCustomField = await dbCore.usersCustomFields.findFirst({
      where: { companyUuid, uuid },
      select: {
        uuid: true,
        name: true,
        type: true,
        showInProfileReports: true
      }
    })

    return usersCustomField
  }

  public async createUsersCustomFields(
    data: ICreateUserCustomFieldDTO
  ): Promise<IUserCustomField> {
    const userCustomField = await dbCore.usersCustomFields.create({
      data,
      select: {
        uuid: true,
        name: true,
        type: true,
        showInProfileReports: true
      }
    })

    return userCustomField
  }

  public async updateUsersCustomFields(
    uuid: string,
    data: IUpdateUserCustomFieldDTO
  ): Promise<IUserCustomField> {
    const userCustomField = await dbCore.usersCustomFields.update({
      where: { uuid },
      data,
      select: {
        uuid: true,
        name: true,
        type: true,
        showInProfileReports: true
      }
    })

    return userCustomField
  }

  public async removeUsersCustomFields(
    uuid: string
  ): Promise<IUserCustomField> {
    const userCustomField = await dbCore.usersCustomFields.delete({
      where: { uuid },
      select: {
        uuid: true
      }
    })

    return userCustomField
  }

  public async import(data: IImportUserDTO[]): Promise<boolean> {
    try {
      const users = await dbCore.$transaction(
        data.map(user =>
          dbCore.users.upsert({
            where: {
              document: user.document,
              registry: user.registry
            },
            update: {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              slug: user.slug
            },
            create: { ...user }
          })
        )
      )
      console.log(users)
    } catch (error) {
      console.log(error)
    }

    return true
  }

  public async matchUserGroup(
    companyUuid: string,
    data: any[]
  ): Promise<boolean> {
    const profileGroups = await dbCore.profileGroups.findMany({
      where: { companyUuid },
      select: {
        uuid: true,
        slug: true,
        responsible: {
          select: {
            uuid: true,
            slug: true
          }
        },
        profileAssessment: {
          select: {
            uuid: true,
            slug: true
          }
        }
      }
    })

    const users = await dbCore.users.findMany({
      where: { companyUuid },
      select: {
        uuid: true,
        slug: true,
        document: true,
        registry: true
      }
    })

    const promises = []
    data.forEach(user => {
      const userUuid = users.find(
        u =>
          u.slug === slug(user?.nome ?? '') &&
          u.document === String(user.cpf) &&
          u.registry === String(user.chapa)
      )?.uuid

      const profileGroupUuid = profileGroups.find(
        item =>
          item?.slug == slug(user['secao'] ?? '') &&
          item?.responsible?.slug == slug(user['avaliador'] ?? '') &&
          item?.profileAssessment?.slug ==
            slug(user['grupo-de-avaliacao'] ?? '')
      )?.uuid

      if (userUuid && profileGroupUuid) {
        const callDb = dbCore.users.updateMany({
          where: {
            uuid: userUuid
          },
          data: {
            profileGroupUuid: profileGroupUuid
          }
        })
        promises.push(callDb)
      }
    })

    if (promises.length > 0) {
      const [usersGroups] = await dbCore.$transaction(promises)
      console.log(usersGroups)
    }

    return true
  }
}

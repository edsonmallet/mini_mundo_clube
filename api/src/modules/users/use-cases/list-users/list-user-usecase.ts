import AppError from '@/shared/errors/app-error'
import { IUser } from '../../infra/http/database/entities/user'
import UserRepository from '../../infra/http/database/repositories/user-repository'

interface Request {
  companyUuid: string
  perPage: string
  page: string
  orderBy: string[]
  filterBy: string[]
}

type Response = { users: IUser[]; totalPages: number }

export default class ListUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute({
    companyUuid,
    perPage,
    page,
    orderBy,
    filterBy
  }: Request): Promise<Response> {
    if (!companyUuid) {
      throw new AppError('Users is empty')
    }

    const data = await this.userRepository.getAllUsersByCompanyUuid(
      companyUuid,
      perPage,
      page,
      orderBy,
      filterBy
    )

    return data
  }
}

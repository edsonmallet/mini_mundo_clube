import AppError from '@/shared/errors/app-error'
import { IUser } from '../../infra/http/database/entities/user'
import UserRepository from '../../infra/http/database/repositories/user-repository'
import IHashProvider from '../../providers/hash-provider/models/ihashprovider'

interface Request {
  uuid: string
  user: IUser
}

type Response = IUser

export default class UpdateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashProvider: IHashProvider
  ) {}
  public async execute({ uuid, user }: Request): Promise<Response> {
    if (!uuid || !user) {
      throw new AppError('User is empty')
    }

    const userExists = await this.userRepository.findUserByUuid(uuid)

    if (!userExists) {
      throw new AppError('User not found')
    }

    if (user.password) {
      user.password = await this.hashProvider.generateHash(
        user.password as string
      )
    }

    const updatedUser = await this.userRepository.update(uuid, user)

    return updatedUser
  }
}

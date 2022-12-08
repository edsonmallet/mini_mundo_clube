import AppError from '@/shared/errors/app-error'
import { IUser } from '../../infra/http/database/entities/user'
import UserRepository from '../../infra/http/database/repositories/user-repository'

interface Request {
  uuid: string
}

type Response = IUser

export default class SoftDeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}
  public async execute({ uuid }: Request): Promise<Response> {
    if (!uuid) {
      throw new AppError('User uuid is empty')
    }

    const user = await this.userRepository.findUserByUuid(uuid)

    if (!user) {
      throw new AppError('User not found')
    }

    const deletedUser = await this.userRepository.delete(uuid)

    return { ...deletedUser }
  }
}

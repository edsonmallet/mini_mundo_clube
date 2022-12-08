import UserRepository from '@/modules/users/infra/http/database/repositories/user-repository'
import AppError from '@/shared/errors/app-error'
import { IUser } from '../../infra/http/database/entities/user'

interface Request {
  userUuid: string
}

type Response = IUser

class GetAuthenticatedUserUseCase {
  constructor(private userRepository: UserRepository) {}
  public async execute({ userUuid }: Request): Promise<Response> {
    if (!userUuid) {
      throw new AppError('User not found')
    }

    const user = await this.userRepository.findUserByUuid(userUuid)

    if (!user) {
      throw new AppError('User not found')
    }

    return user
  }
}

export default GetAuthenticatedUserUseCase

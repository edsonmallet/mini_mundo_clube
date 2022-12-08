import { IUser } from '@/modules/users/infra/http/database/entities/user'
import AppError from '@/shared/errors/app-error'
import { sign } from 'jsonwebtoken'
import IHashProvider from '../../providers/hash-provider/models/ihashprovider'
import { IUserRepository } from '../../repositories/iuser-repository'

interface Request {
  email: string
  password: string
}

interface Response {
  user: IUser
  token: string
}

class AuthenticateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    if (!email || !password) {
      throw new AppError('Email or password is empty')
    }

    const user = await this.userRepository.findUserByField('email', email, true)

    if (!user) {
      throw new AppError('Email or password incorrect', 401)
    }

    const passwordMatched = this.hashProvider.compareHash(
      password,
      user.password as string
    )

    if (!passwordMatched) {
      throw new AppError('Email or password incorrect', 401)
    }

    const { JWT_SECRET, JWT_EXPIRATION } = process.env

    const token = sign(
      { companyUuid: user.companyUuid, role: user.role, userUuid: user.uuid },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRATION
      }
    )

    delete user.document
    delete user.email
    delete user.registry

    return {
      user,
      token
    }
  }
}

export default AuthenticateUserUseCase

import { Request, Response } from 'express'
import UserRepository from '../../infra/http/database/repositories/user-repository'
import BCryptHashProvider from '../../providers/hash-provider/implementations/bcrypt-hash-provider'
import AuthenticateUserUseCase from './authenticate-user-usecase'

export default class AuthenticateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const userRepository = new UserRepository()
    const hashProvider = new BCryptHashProvider()
    const authenticateUser = new AuthenticateUserUseCase(
      userRepository,
      hashProvider
    )

    const { user, token } = await authenticateUser.execute({
      email,
      password
    })

    delete user.password

    return response.json({ user, token })
  }
}

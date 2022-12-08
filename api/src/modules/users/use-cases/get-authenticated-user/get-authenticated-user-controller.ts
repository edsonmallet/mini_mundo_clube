import UserRepository from '@/modules/users/infra/http/database/repositories/user-repository'
import { Request, Response } from 'express'
import GetAuthenticatedUserUseCase from './get-authenticated-user-usecase'

export default class GetAuthenticatedUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { userUuid } = request.logged

    const userRepository = new UserRepository()

    const authenticatedUser = new GetAuthenticatedUserUseCase(userRepository)
    const user = await authenticatedUser.execute({ userUuid })

    return response.json({ ...user })
  }
}

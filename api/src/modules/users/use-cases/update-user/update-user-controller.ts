import { Request, Response } from 'express'
import UserRepository from '../../infra/http/database/repositories/user-repository'
import BCryptHashProvider from '../../providers/hash-provider/implementations/bcrypt-hash-provider'
import UpdateUserUseCase from './update-user-usecase'

export default class UpdateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { uuid } = request.params
    const user = request.body

    const userRepository = new UserRepository()
    const hashProvider = new BCryptHashProvider()
    const updateUser = new UpdateUserUseCase(userRepository, hashProvider)

    const updatedUser = await updateUser.execute({
      uuid: uuid || request.logged.userUuid,
      user
    })

    return response.status(200).json(updatedUser)
  }
}

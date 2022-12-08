import { Request, Response } from 'express'
import UserRepository from '../../infra/http/database/repositories/user-repository'
import SoftDeleteUserUseCase from './soft-delete-user-usecase'

export default class SoftDeleteUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { uuid } = request.params

    const userRepository = new UserRepository()
    const softDeleteUser = new SoftDeleteUserUseCase(userRepository)
    const softDeletedUser = await softDeleteUser.execute({
      uuid: uuid || request.logged.userUuid
    })

    return response.status(200).json({ ...softDeletedUser })
  }
}

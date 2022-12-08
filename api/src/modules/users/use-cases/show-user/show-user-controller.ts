import { Request, Response } from 'express'
import UserRepository from '../../infra/http/database/repositories/user-repository'
import ShowUserUseCase from './show-user-usecase'

export default class ShowUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { uuid } = request.params

    const userRepository = new UserRepository()
    const showUser = new ShowUserUseCase(userRepository)
    const showedUser = await showUser.execute({
      uuid: uuid || request.logged.userUuid
    })

    return response.status(201).json({ ...showedUser })
  }
}

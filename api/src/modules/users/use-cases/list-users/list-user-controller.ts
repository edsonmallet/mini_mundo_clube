import { Request, Response } from 'express'
import UserRepository from '../../infra/http/database/repositories/user-repository'
import ListUsersUseCase from './list-user-usecase'

export default class ListUsersController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const companyUuid = request.logged.companyUuid
    const { perPage, page, orderBy, filterBy } = request.query

    const userRepository = new UserRepository()
    const listUser = new ListUsersUseCase(userRepository)
    const data = await listUser.execute({
      companyUuid,
      perPage: perPage as string,
      page: page as string,
      orderBy: orderBy as string[],
      filterBy: filterBy as string[]
    })

    return response.status(201).json(data)
  }
}

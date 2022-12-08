import { Request, Response } from 'express'
import CompanyRepository from '../../infra/http/database/repositories/company-repository'
import CreateUserUseCase from './create-company-usecase'

export default class CreateCompanyController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, fancyName, corporateName, responsibleUuid } = request.body

    const responsible = {
      master: responsibleUuid,
      consultant: responsibleUuid || request.logged.userUuid,
      admin: request.logged.userUuid
    }

    const company = {
      name,
      fancyName,
      corporateName,
      responsibleUuid: responsible[request.logged.role],
      creatorUuid: request.logged.userUuid
    }

    const companyRepository = new CompanyRepository()
    const createCompany = new CreateUserUseCase(companyRepository)
    const createdCompany = await createCompany.execute({ company })

    return response.status(201).json({ ...createdCompany })
  }
}

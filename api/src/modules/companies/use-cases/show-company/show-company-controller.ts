import { Request, Response } from 'express'
import CompanyRepository from '../../infra/http/database/repositories/company-repository'
import ShowCompanyUseCase from './show-company-usecase'

export default class ShowCompanyController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { uuid } = request.params

    const companyRepository = new CompanyRepository()
    const showCompany = new ShowCompanyUseCase(companyRepository)
    const company = await showCompany.execute({ uuid })

    return response.status(201).json({ ...company })
  }
}

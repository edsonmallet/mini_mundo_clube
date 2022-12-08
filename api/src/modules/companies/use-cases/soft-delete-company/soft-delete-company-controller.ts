import { Request, Response } from 'express'
import CompanyRepository from '../../infra/http/database/repositories/company-repository'
import SoftDeleteCompanyUseCase from './soft-delete-company-usecase'

export default class SoftDeleteCompanyController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { uuid } = request.params

    const companyRepository = new CompanyRepository()
    const softDeleteCompany = new SoftDeleteCompanyUseCase(companyRepository)
    const company = await softDeleteCompany.execute({
      uuid
    })

    return response.status(200).json({ ...company })
  }
}

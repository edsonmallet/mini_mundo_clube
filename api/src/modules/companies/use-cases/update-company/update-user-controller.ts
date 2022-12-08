import { Request, Response } from 'express'
import CompanyRepository from '../../infra/http/database/repositories/company-repository'
import UpdateCompanyUseCase from './update-user-usecase'

export default class UpdateCompanyController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { uuid } = request.params
    const company = request.body

    const companyRepository = new CompanyRepository()
    const updateCompany = new UpdateCompanyUseCase(companyRepository)

    const updatedCompany = await updateCompany.execute({
      uuid,
      company
    })

    return response.status(200).json({ ...updatedCompany })
  }
}

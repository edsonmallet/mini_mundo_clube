import AppError from '@/shared/errors/app-error'
import { ICompany } from '../../infra/http/database/entities/company'
import { ICompanyRepository } from '../../repositories/icompany-repository'

interface Request {
  uuid: string
  company: ICompany
}

type Response = ICompany

export default class UpdateCompanyUseCase {
  constructor(private companyRepository: ICompanyRepository) {}
  public async execute({ uuid, company }: Request): Promise<Response> {
    if (!uuid || !company) {
      throw new AppError('Company is empty')
    }

    const existsCompanyByUuid = await this.companyRepository.findCompanyByUuid(
      uuid
    )

    if (!existsCompanyByUuid) {
      throw new AppError('Company not found')
    }

    if (company.name) {
      const existsCompanyByName =
        await this.companyRepository.findCompanyByfield('name', company.name)

      if (existsCompanyByName) {
        throw new AppError('Company already exists')
      }
    }

    const updatedUser = await this.companyRepository.update(uuid, company)

    return { ...updatedUser }
  }
}

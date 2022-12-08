import AppError from '@/shared/errors/app-error'
import { ICompany } from '../../infra/http/database/entities/company'
import CompanyRepository from '../../infra/http/database/repositories/company-repository'

interface Request {
  uuid: string
}

type Response = ICompany

export default class ShowCompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  public async execute({ uuid }: Request): Promise<Response> {
    if (!uuid) {
      throw new AppError('Company uuid is empty')
    }

    const company = await this.companyRepository.findCompanyByUuid(uuid)
    return { ...company }
  }
}

import AppError from '@/shared/errors/app-error'
import { ICompany } from '../../infra/http/database/entities/company'
import CompanyRepository from '../../infra/http/database/repositories/company-repository'

interface Request {
  uuid: string
}

type Response = ICompany

export default class SoftDeleteCompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}
  public async execute({ uuid }: Request): Promise<Response> {
    if (!uuid) {
      throw new AppError('Company uuid is empty')
    }

    const existsCompanyByUuid = await this.companyRepository.findCompanyByUuid(
      uuid
    )

    if (!existsCompanyByUuid) {
      throw new AppError('Company not found')
    }

    const deletedCompany = await this.companyRepository.delete(uuid)

    return { ...deletedCompany }
  }
}

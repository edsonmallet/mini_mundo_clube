import AppError from '@/shared/errors/app-error'
import { ICreateCompanyDTO } from '../../dtos/icreate-company-dto'
import { ICompany } from '../../infra/http/database/entities/company'
import { ICompanyRepository } from '../../repositories/icompany-repository'

interface IRequest {
  company: ICreateCompanyDTO
}

type Response = ICompany

export default class CreateUserUseCase {
  constructor(private companyRepository: ICompanyRepository) {}

  public async execute({ company }: IRequest): Promise<Response> {
    if (!company) {
      throw new AppError('Company is empty')
    }

    const existsCompany = await this.companyRepository.findCompanyByfield(
      'name',
      company.name as string
    )

    if (existsCompany) {
      throw new AppError('Company already exists')
    }

    const createdCompany = await this.companyRepository.create(company)

    return { ...createdCompany }
  }
}

import { ICreateCompanyDTO } from "../dtos/icreate-company-dto";
import { IUpdateCompanyDTO } from "../dtos/iupdate-company-dto";
import { ICompany } from "../infra/http/database/entities/company";

export interface ICompanyRepository {
  create(data: ICreateCompanyDTO): Promise<ICompany>;
  update(uuid: string, data: IUpdateCompanyDTO): Promise<ICompany>;
  delete(uuid: string): Promise<ICompany>;
  findCompanyByUuid(uuid: string): Promise<ICompany | undefined>;
  findCompanyByfield(
    field: string,
    value: string
  ): Promise<ICompany | undefined>;
  findAllCompanies(
    uuid: string,
    role: string,
    orderBy: string[],
    filterBy: string[]
  ): Promise<ICompany[]>;
}

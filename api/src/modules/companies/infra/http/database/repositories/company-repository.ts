import { ICreateCompanyDTO } from "@/modules/companies/dtos/icreate-company-dto";
import { IUpdateCompanyDTO } from "@/modules/companies/dtos/iupdate-company-dto";
import { ICompanyRepository } from "@/modules/companies/repositories/icompany-repository";
import { dbCore } from "@/shared/infra/http/database/core.server";
import { ICompany } from "../entities/company";

export default class CompanyRepository implements ICompanyRepository {
  public async findAllCompanies(
    uuid: string,
    role: string,
    orderBy: string[],
    filterBy: string[]
  ): Promise<ICompany[]> {
    const query = {
      master: {},
      consultant: {
        creatorUuid: uuid,
      },
      admin: { responsibleUuid: uuid, creatorUuid: uuid },
    };

    const filterJson: object[] = [];
    const orderByJson: object[] = [];
    const whereJson = query[role];

    if (filterBy) {
      filterBy.map((filter) => {
        filterJson.push({
          [filter.split("|")[0]]: {
            contains: `${filter.split("|")[1]}`,
          },
        });
      });
      whereJson["OR"] = filterJson;
    }

    if (orderBy) {
      orderBy?.map((item) => {
        orderByJson.push({ [item.split("|")[0]]: `${item.split("|")[1]}` });
      });
    }

    const companies = await dbCore.companies.findMany({
      where: whereJson,
      orderBy: orderByJson,
      select: {
        uuid: true,
        name: true,
        fancyName: true,
        corporateName: true,
      },
    });

    return companies;
  }

  public async findCompanyByUuid(uuid: string): Promise<ICompany | undefined> {
    const company = await dbCore.companies.findUnique({
      where: {
        uuid,
      },
    });

    return company;
  }

  public async findCompanyByfield(
    field: string,
    value: string
  ): Promise<ICompany | undefined> {
    const company = dbCore.companies.findFirst({
      where: {
        [field]: value,
      },
    });

    return company;
  }

  public async create(data: ICreateCompanyDTO): Promise<ICompany> {
    const company = await dbCore.companies.create({
      data: {
        name: data.name,
        fancyName: data.fancyName,
        corporateName: data.corporateName,
        document: data.document,
        wallets: {
          create: {
            textContract: data.wallets.textContract,
            version: data.wallets.version,
            beneficts: {
              create: data.wallets.beneficts,
            },
          },
        },
      },
    });

    return company;
  }

  public async update(
    uuid: string,
    data: IUpdateCompanyDTO
  ): Promise<ICompany> {
    const user = await dbCore.companies.update({
      where: {
        uuid,
      },
      data,
    });

    return user;
  }

  public async delete(uuid: string): Promise<ICompany> {
    const company = await dbCore.companies.delete({
      where: {
        uuid,
      },
      select: {
        uuid: true,
        name: true,
        fancyName: true,
        corporateName: true,
      },
    });

    return company;
  }
}

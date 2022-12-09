import { Request, Response } from "express";
import { ICreateCompanyDTO } from "../../dtos/icreate-company-dto";
import CompanyRepository from "../../infra/http/database/repositories/company-repository";
import CreateCompanyUseCase from "./create-company-usecase";

export default class CreateCompanyController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const company: ICreateCompanyDTO = request.body;

    const companyRepository = new CompanyRepository();
    const createCompanyUseCase = new CreateCompanyUseCase(companyRepository);
    const createdCompany = await createCompanyUseCase.execute({ company });

    return response.status(201).json(createdCompany);
  }
}

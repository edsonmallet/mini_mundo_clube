import { Prisma } from "@prisma/client";

export interface ICreateCompanyDTO
  extends Prisma.CompaniesUncheckedCreateInput {}

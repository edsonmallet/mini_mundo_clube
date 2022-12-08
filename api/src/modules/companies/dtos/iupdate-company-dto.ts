import { Prisma } from "@prisma/client";

export interface IUpdateCompanyDTO
  extends Prisma.CompaniesUncheckedUpdateInput {}

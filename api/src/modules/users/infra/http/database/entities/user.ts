export type IUser = {
  uuid?: string;
  email?: string | null;
  password?: string;
  firstName?: string;
  lastName?: string;
  document?: string | null;
  registry?: string | null;
  avatarUrl?: string | null;
  tokenPassword?: string | null;
  companyUuid?: string | null;
  tokenPasswordCreatedAt?: Date | string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string | null;
};

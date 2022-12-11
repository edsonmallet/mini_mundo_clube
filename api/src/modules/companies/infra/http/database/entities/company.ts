interface beneficts {
  uuid?: string;
  name: string;
  description: string;
  value: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

interface wallets {
  uuid?: string;
  textContract: string;
  version: string;
  beneficts?: beneficts[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface ICompany {
  uuid?: string;
  name: string;
  fancyName: string;
  corporateName: string;
  document: string;
  wallets?: wallets[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

interface beneficts {
  uuid?: string;
  name: string;
  description: string;
  value: number;
}

interface wallets {
  uuid?: string;
  textContract: string;
  version: string;
  beneficts?: beneficts[];
}

export interface ICreateCompanyDTO {
  uuid?: string;
  name: string;
  fancyName: string;
  corporateName: string;
  document: string;
  wallets?: wallets[];
}

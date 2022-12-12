export interface IResults {
  uuid: string;
  document: string;
  email: string;
  password: string;
  name: string;
  preRegisterDate: string;
  tokePreRegister: any;
  registerDate: string;
  tokenDiscount: string;
  isActivated: boolean;
  birthDate: string;
  isAdminCompany: boolean;
  parentUuid: any;
  walletUuid: string;
  companyUuid: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  parents: any;
  companies: Companies;
  wallets: Wallets;
}

export interface Companies {
  uuid: string;
  name: string;
  fancyName: string;
  corporateName: string;
  document: string;
}

export interface Wallets {
  textContract: string;
  version: string;
  walletsBeneficts: WalletsBenefict[];
}

export interface WalletsBenefict {
  realDiscount: number;
  beneficts: Beneficts;
}

export interface Beneficts {
  name: string;
  slug: string;
  description: string;
}

declare namespace Express {
  export interface Request {
    logged: {
      companyUuid: string
      role: string
      userUuid: string
      iat: number
      exp: number
    }
  }
}

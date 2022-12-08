import { Logged } from '@/modules/users/dtos/logged-dto'
import AppError from '@/shared/errors/app-error'
import { NextFunction, Request, Response } from 'express'
import { verify, decode } from 'jsonwebtoken'

export default function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization
  const currentTenantId = request.headers['x-tenant-uuid']

  if (!authHeader) {
    throw new Error('JWT token is missing')
  }

  const [, token] = authHeader.split(' ')

  try {
    verify(token, process.env.JWT_SECRET)
    const decodedToken = decode(token) as unknown as Logged

    if (
      currentTenantId &&
      (currentTenantId !== 'undefined' ||
        currentTenantId !== null ||
        currentTenantId !== undefined)
    ) {
      decodedToken.companyUuid = currentTenantId as string
    }
    request.logged = decodedToken

    return next()
  } catch {
    throw new AppError('Unauthorized', 401)
  }
}

import { PrismaClient } from '@prisma/client'
const dbCore: PrismaClient = new PrismaClient()

dbCore.$use(async (params, next) => {
  if (params.action === 'findUnique' || params.action === 'findFirst') {
    params.action = 'findFirst'
    params.args.where.deletedAt = null
  }
  if (params.action === 'findMany') {
    if (params.args.where) {
      if (params.args.where.deletedAt === undefined) {
        params.args.where.deletedAt = null
      }
    } else {
    }
  }
  if (params.action === 'update') {
    params.args.data = { ...params.args.data }
  }
  if (params.action === 'updateMany') {
    if (params.args.where !== undefined) {
      params.args.where.deletedAt = null
    } else {
      params.args.where = { deletedAt: null }
    }
  }
  if (params.action === 'delete') {
    params.action = 'update'
    params.args.data = { deletedAt: new Date() }
  }
  if (params.action === 'deleteMany') {
    // Delete many queries
    params.action = 'updateMany'
    if (params.args.data !== undefined) {
      params.args.data.deletedAt = new Date()
    } else {
      params.args.data = { deletedAt: new Date() }
    }
  }

  const result = await next(params)

  return result
})

export { dbCore }

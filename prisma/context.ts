import { PrismaClient } from '@prisma/client'
import { IncomingMessage, ServerResponse } from 'http'

const prisma = new PrismaClient()

export interface MicroContext {
  req: IncomingMessage
  res: ServerResponse
}
export interface Context {
  prisma: PrismaClient
  req: IncomingMessage
  res: ServerResponse
}

export const createContext = (ctx: MicroContext) => {
  return {
    ...ctx,
    prisma,
  }
}

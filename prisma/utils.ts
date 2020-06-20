import { verify } from 'jsonwebtoken'
import { Context } from './context'

interface Token {
  userId: string
}

export function getUserId(context: Context) {
  const Authorization = context.req.headers.Authorization as string
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const verifiedToken = verify(token, process.env.APP_SECRET) as Token
    return verifiedToken && verifiedToken.userId
  }
}

import { rule } from 'graphql-shield'

export const isAuthenticated = rule()(async (_parent, args, ctx: Context) => {
  return Boolean(ctx.user)
})

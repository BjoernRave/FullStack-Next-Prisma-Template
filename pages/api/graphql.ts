import { ApolloServer } from 'apollo-server-micro'
import { applyMiddleware } from 'graphql-middleware'
import withSession from 'lib/auth'
import cors from 'micro-cors'
import { NextApiRequest, NextApiResponse } from 'next'
import { createContext } from '../../prisma/context'
import { permissions } from '../../prisma/permissions'
import { schema } from '../../prisma/schema'
require('dotenv').config()

const apolloServer = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: createContext,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default cors()(
  withSession(async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'OPTIONS') {
      res.end()
      return
    }
    return apolloServer.createHandler({ path: '/api/graphql' })(req, res)
  })
)

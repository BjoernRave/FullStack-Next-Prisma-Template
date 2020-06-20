import { makeSchema } from '@nexus/schema'
import { nexusPrismaPlugin } from 'nexus-prisma'
import * as path from 'path'
import * as resolvers from './resolvers'

const getPath = (fileName: string) =>
  path.join(process.cwd(), 'generated', fileName)

export const schema = makeSchema({
  types: resolvers,
  plugins: [
    nexusPrismaPlugin({
      experimentalCRUD: true,
      outputs: {
        typegen: getPath('nexus.ts'),
      },
    }),
  ],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@prisma/client',
        alias: 'client',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
    contextType: 'Context.Context',
  },
})

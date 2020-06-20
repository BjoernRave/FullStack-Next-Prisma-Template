import { extendType, objectType } from '@nexus/schema'

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.author()
    t.model.published()
    t.model.content()
  },
})

export const PostQueries = extendType({
  type: 'Query',
  definition(t) {
    t.crud.posts()
    t.crud.post()
  },
})

export const PostMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOnePost()
    t.crud.updateOnePost()
    t.crud.deleteOnePost()
  },
})

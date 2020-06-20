import { allow, deny, shield } from 'graphql-shield'
import { isAuthenticated } from './rules'

export const permissions = shield(
  {
    Query: {
      posts: allow,
      post: allow,
      me: allow,
    },
    Mutation: {
      createOnePost: isAuthenticated,
      updateOnePost: isAuthenticated,
      deleteOnePost: isAuthenticated,
      signup: allow,
      login: allow,
    },
    Post: allow,
    AuthPayload: allow,
    User: allow,
  },
  {
    fallbackRule: deny,
  }
)

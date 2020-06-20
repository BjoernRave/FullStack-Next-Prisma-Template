import * as Typegen from 'nexus-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
  first?: boolean
  last?: boolean
  before?: boolean
  after?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'No custom scalars are used in your Prisma Schema.'

// Prisma model type definitions
interface PrismaModels {
  Post: Prisma.Post
  User: Prisma.User
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    posts: {
      filtering: 'id' | 'title' | 'content' | 'published' | 'authorId' | 'AND' | 'OR' | 'NOT' | 'author'
      ordering: 'id' | 'title' | 'content' | 'published' | 'authorId'
    }
    users: {
      filtering: 'id' | 'email' | 'password' | 'name' | 'posts' | 'role' | 'AND' | 'OR' | 'NOT'
      ordering: 'id' | 'email' | 'password' | 'name' | 'role'
    }
  },
  Post: {

  }
  User: {
    posts: {
      filtering: 'id' | 'title' | 'content' | 'published' | 'authorId' | 'AND' | 'OR' | 'NOT' | 'author'
      ordering: 'id' | 'title' | 'content' | 'published' | 'authorId'
    }
  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    post: 'Post'
    posts: 'Post'
    user: 'User'
    users: 'User'
  },
  Mutation: {
    createOnePost: 'Post'
    updateOnePost: 'Post'
    updateManyPost: 'BatchPayload'
    deleteOnePost: 'Post'
    deleteManyPost: 'BatchPayload'
    upsertOnePost: 'Post'
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'BatchPayload'
    deleteOneUser: 'User'
    deleteManyUser: 'BatchPayload'
    upsertOneUser: 'User'
  },
  Post: {
    id: 'Int'
    title: 'String'
    content: 'String'
    published: 'Boolean'
    author: 'User'
    authorId: 'Int'
  }
  User: {
    id: 'Int'
    email: 'String'
    password: 'String'
    name: 'String'
    posts: 'Post'
    role: 'String'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  Post: Typegen.NexusPrismaFields<'Post'>
  User: Typegen.NexusPrismaFields<'User'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  
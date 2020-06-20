import gql from 'graphql-tag';
import * as React from 'react';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createOnePost: Post;
  deleteOnePost?: Maybe<Post>;
  login: AuthPayload;
  signup: AuthPayload;
  updateOnePost?: Maybe<Post>;
};


export type MutationCreateOnePostArgs = {
  data: PostCreateInput;
};


export type MutationDeleteOnePostArgs = {
  where: PostWhereUniqueInput;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  role: Scalars['String'];
};


export type MutationUpdateOnePostArgs = {
  data: PostUpdateInput;
  where: PostWhereUniqueInput;
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  content?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  published: Scalars['Boolean'];
  title: Scalars['String'];
};

export type PostCreateInput = {
  author?: Maybe<UserCreateOneWithoutPostsInput>;
  content?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  title: Scalars['String'];
};

export type PostUpdateInput = {
  author?: Maybe<UserUpdateOneWithoutPostsInput>;
  content?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  published?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
};

export type PostWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: Array<Post>;
};


export type QueryPostArgs = {
  where: PostWhereUniqueInput;
};


export type QueryPostsArgs = {
  skip?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  role: Scalars['String'];
};

export type UserCreateOneWithoutPostsInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateWithoutPostsInput>;
};

export type UserCreateWithoutPostsInput = {
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  role: Scalars['String'];
};

export type UserUpdateOneWithoutPostsInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateWithoutPostsInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<UserUpdateWithoutPostsDataInput>;
  upsert?: Maybe<UserUpsertWithoutPostsInput>;
};

export type UserUpdateWithoutPostsDataInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
};

export type UserUpsertWithoutPostsInput = {
  create: UserCreateWithoutPostsInput;
  update: UserUpdateWithoutPostsDataInput;
};

export type UserWhereUniqueInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
};

export type AccountQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'role'>
  )> }
);


export const AccountDocument = gql`
    query ACCOUNT {
  me {
    id
    name
    role
  }
}
    `;

export const AccountComponent = (props: Omit<Urql.QueryProps<AccountQuery, AccountQueryVariables>, 'query'> & { variables?: AccountQueryVariables }) => (
  <Urql.Query {...props} query={AccountDocument} />
);


export function useAccountQuery(options: Omit<Urql.UseQueryArgs<AccountQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AccountQuery>({ query: AccountDocument, ...options });
};
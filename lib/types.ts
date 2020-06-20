import 'next'
import { NextPageContext } from 'next'
import { Client as UrqlClient } from 'urql'

declare module 'next' {
  export interface NextPageContext {
    urqlClient: UrqlClient
  }
}

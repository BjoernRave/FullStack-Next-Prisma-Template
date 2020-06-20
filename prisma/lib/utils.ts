import createMollieClient from '@mollie/api-client'
import { Integration, Product } from '@prisma/client'
import parseDomain from 'parse-domain'
import Shopify from 'shopify-api-node'
import { Context } from '../context'

export const generateRandomString = (length: number) => {
  let result = ''
  const specials = '!@#$%^&*'
  const numbers = '0123456789'
  const smallChars = 'abcdefghijklmnopqrstuvwxyz'
  const bigChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let i = 0; i < length / 4; i++) {
    result += specials.charAt(Math.floor(Math.random() * specials.length))
    result += numbers.charAt(Math.floor(Math.random() * numbers.length))
    result += smallChars.charAt(Math.floor(Math.random() * smallChars.length))
    result += bigChars.charAt(Math.floor(Math.random() * bigChars.length))
  }
  return result
}

// export const sentryMiddleware = sentry({
//   config: {
//     dsn: 'https://fd9417fd8a1a464fa280cd95602ec969@sentry.io/1853162',
//     environment: process.env.NODE_ENV,
//     enabled: process.env.NODE_ENV === 'production',
//   },
//   forwardErrors: true,
//   withScope: (scope, context: any) => {
//     scope.setExtra('body', context?.req?.body)
//     scope.setExtra('origin', context?.req?.headers?.origin)
//     scope.setExtra('user-agent', context?.req?.headers['user-agent'])
//   },
// })

export const getSubDomain = (ctx: Context) => {
  let subDomain: string

  if (process.env.NODE_ENV === 'production') {
    if (ctx.req.headers.host === 'inventhora.com') {
      return 'dev'
    }
    const parsedDomain = parseDomain(ctx.req.headers.host as string)

    if (!parsedDomain || !parsedDomain.subdomain) {
      throw new Error(
        `Error finding subDomain in getSubDomain, host is: ${ctx.req.headers.host}`
      )
    }

    subDomain = parsedDomain.subdomain
  } else {
    const parsedDomain = parseDomain(ctx.req.headers.host as string, {
      customTlds: ['localhost'],
    })

    if (!subDomain) {
      subDomain = 'dev'
    } else {
      subDomain = parsedDomain && parsedDomain.domain
    }
  }
  return subDomain
}

export const createMollie = () => {
  return createMollieClient({ apiKey: process.env.MOLLIE_API_KEY })
}

export const formatDate = (date: Date) => {
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

export const compareObjects = (
  obj1: object,
  obj2: object,
  values: string[]
) => {
  return values.every((value) => {
    if (!obj1[value] || !obj2[value]) return true

    if (obj1[value]?.toLowerCase() === obj2[value]?.toLowerCase()) {
      return true
    } else {
      return false
    }
  })
}

export const cancelImport = async ({
  ctx,
  importId,
  error,
}: {
  ctx: Context
  importId: string
  error: any
}) => {
  await ctx.prisma.batch.deleteMany({
    where: { source: { equals: importId } },
  })
  await ctx.prisma.movement.deleteMany({
    where: { source: { equals: importId } },
  })
  await ctx.prisma.inventory.deleteMany({
    where: { source: { equals: importId } },
  })
  await ctx.prisma.product.deleteMany({
    where: { source: { equals: importId } },
  })
  await ctx.prisma.client.deleteMany({
    where: { source: { equals: importId } },
  })
  await ctx.prisma.supplier.deleteMany({
    where: { source: { equals: importId } },
  })
  throw new Error(error)
}

export const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/ /g, '_')
    .replace(/\./g, '_')
    .replace(/\(|\)|\/|\\|\[|\]|\{|\}|\|/g, '')
}

export const createProductFullName = (product: Product) => {
  const possibles = ['name', 'format', 'variant', 'volume', 'weight']

  const parts = []

  possibles.forEach((val) => {
    if (product[val]) {
      parts.push(product[val])
    }
  })

  return parts.join(' ')
}

export const roundTo = (number: number, decimals: number) => {
  const x = Math.pow(10, Number(decimals) + 1)
  return Number((Number(number) + 1 / x).toFixed(decimals))
}

export const generateImportId = () => {
  return `import_${new Date().toISOString()}`
}

export const initShopify = (integration: Integration) => {
  if (integration.service !== 'shopify') {
    throw new Error('A shopify integration is required!')
  }

  return new Shopify({
    accessToken: integration.secret,
    shopName: integration.name,
    apiVersion: '2020-04',
  })
}

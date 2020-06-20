import { ManagementClient } from 'auth0'
import { verify, VerifyOptions } from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import { User } from './types'

export const authenticateRequest = (
  token: string,
  subDomain: string
): Promise<User> => {
  const options: VerifyOptions = {
    audience: process.env.API_AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256'],
  }

  const getKey = (header, callback) => {
    const client = jwksClient({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    })

    client.getSigningKey(header.kid, (err, key: jwksClient.SigningKey) => {
      if (err) console.log(err)

      try {
        callback(null, key.getPublicKey())
      } catch (err) {
        console.log(err)

        callback(err)
      }
    })
  }

  return new Promise((resolve, reject) => {
    verify(token, getKey, options, (err, decoded: User) => {
      if (err) {
        console.log('verify err', err)

        return reject(err)
      }

      if (
        process.env.NODE_ENV === 'development' ||
        (decoded.scope && decoded.scope.split(' ').includes(subDomain))
      ) {
        return resolve(decoded)
      }

      return reject('Not authorized on this domain!')
    })
  })
}

export const createManagement = () => {
  return new ManagementClient({
    clientId: process.env.API_AUTH0_CLIENT_ID,
    clientSecret: process.env.API_AUTH0_CLIENT_SECRET,
    domain: process.env.AUTH0_DOMAIN,
  })
}

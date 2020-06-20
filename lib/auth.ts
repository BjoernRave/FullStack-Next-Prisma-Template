// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession } from 'next-iron-session'
import Router from 'next/router'
import { useEffect, useState } from 'react'

export default function withSession(handler) {
  return withIronSession(handler, {
    // The password in this example is in plain text (inside `now.json`) for ease of deployment and understanding.
    // ⚠️ Do not reuse the same password, create a different password for you and store it in a secret management system
    // Example for Zeit's now: https://vercel.com/docs/v2/serverless-functions/env-and-secrets
    password: process.env.AUTH_SECRET,
    cookieName: 'session',
    cookieOptions: {
      // the next line allows to use the session in non-https environements like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
  })
}

export const useUser = ({ redirectTo, redirectIfFound = false }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    /*eslint-disable */
    ;(async () => {
      const res = await fetch('/api/user').then((res) => res.json())
      setUser(res)
      // if no redirect needed, just return (example: already on /dashboard)
      // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
      if (!redirectTo) return

      if (
        // If redirectTo is set, redirect if the user was not found.
        (redirectTo && !redirectIfFound && !res?.isLoggedIn) ||
        // If redirectIfFound is also set, redirect if the user was found
        (redirectIfFound && res?.isLoggedIn)
      ) {
        Router.push(redirectTo)
      }
    })()
  }, [redirectIfFound, redirectTo])

  return user
}

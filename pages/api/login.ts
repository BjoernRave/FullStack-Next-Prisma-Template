import { PrismaClient } from '@prisma/client'
import { compare } from 'bcryptjs'
import withSession from 'lib/auth'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default withSession(
  async (req: NextApiRequest & { session: any }, res: NextApiResponse) => {
    const { email, password } = await req.body

    try {
      const user = await prisma.user.findOne({ where: { email } })

      if (!user) {
        throw new Error(`No user found for email: ${email}`)
      }

      const passwordValid = await compare(password, user.password)

      if (!passwordValid) {
        throw new Error('Invalid password')
      }

      req.session.set('user', user)
      await req.session.save()
      res.json(user)
    } catch (error) {
      res.status(500)
      res.json(error.data)
    }
  }
)

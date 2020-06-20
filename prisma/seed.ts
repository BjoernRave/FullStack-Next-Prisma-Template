import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
const prisma = new PrismaClient()
require('dotenv').config()

async function main() {
  await prisma.user.create({
    data: {
      name: 'TestUser',
      role: 'admin',
      email: 'test@test.com',
      password: await hash('testpassword', 10),
    },
  })
}

main().then(async () => {
  await prisma.disconnect()
})

import withSession from 'lib/auth'
import { NextApiRequest, NextApiResponse } from 'next'

export default withSession(
  async (req: NextApiRequest & { session: any }, res: NextApiResponse) => {
    req.session.destroy()
    await req.session.save()
    res.status(200).json({ message: 'logged out' })
  }
)

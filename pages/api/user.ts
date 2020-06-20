import withSession from 'lib/auth'
import { NextApiRequest, NextApiResponse } from 'next'

export default withSession(
  async (req: NextApiRequest & { session: any }, res: NextApiResponse) => {
    const user = req.session.get('user')

    if (user) {
      // in a real world application you might read the user id from the session and then do a database request
      // to get more information on the user if needed
      res.json({
        isLoggedIn: true,
        ...user,
      })
    } else {
      res.json({
        isLoggedIn: false,
      })
    }
  }
)

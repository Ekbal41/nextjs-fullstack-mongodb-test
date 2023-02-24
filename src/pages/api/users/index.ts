// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import users from '../../../users'
import teen from '../../../middleware/teen'
import { User, connectMongoDb,closeConnection } from '../../../utils/mongodb'


type User = {
  name: string
  age: number
}



const allusers = async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
 

  if (req.method == 'GET') {
    console.log('its here get ')
    await connectMongoDb();
    const users = await User.find({})
    return res.status(200).json(users.reverse())

  } else if (req.method == 'POST') {
    console.log('i am here post')
    console.log(req.body)
    await connectMongoDb();
    await User.create({ name: req.body.name, age: 100 })
    let updatedUser = await User.find({})
    updatedUser = updatedUser.reverse()
    
    return res.status(200).json(updatedUser)

  }

}


export default teen(allusers)
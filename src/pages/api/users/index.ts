// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import users from '../../../users'
import teen from '../../../middleware/teen'
import { User, connectMongoDb, closeConnection } from '../../../utils/mongodb'
import { Apiuser } from '../createaccount'
import jwt_decode from "jwt-decode";
type User = {
  name: string
  age: number
}



const allusers = async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]> | any
) {


  if (req.method == 'GET') {
    console.log('its here get ')

    const token: any = req.headers.cookie?.split('=')[1]
    if (token) {
      var decoded: any = jwt_decode(token);
      let userId = decoded.id
      console.log(req.headers)
      await connectMongoDb();
      const correntUser = await Apiuser.findOne({ _id: userId })
      console.log(correntUser)

      const users = await User.find({})
      if (correntUser.name == 'asif ekbal') {
        return res.status(200).json(users.reverse())
      }

    }
    else {
      return res.status(200)
    }



  } else if (req.method == 'POST') {
    console.log('i am here post')
    console.log(req.body)
    await connectMongoDb();
    await User.create({ name: req.body.name, age: req.body.age })
    let updatedUser = await User.find({})
    updatedUser = updatedUser.reverse()

    return res.status(200).json(updatedUser)

  }

}


export default teen(allusers)
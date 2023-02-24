import type { NextApiRequest, NextApiResponse } from 'next'
import { type } from 'os'
import users from '../../../users'
import { User, connectMongoDb, closeConnection } from '../../../utils/mongodb'
type User = {
    name: string
    age: number
}

type Message = {
    message: string
}

const crudUser = async function handler(
    req: NextApiRequest,
    res: NextApiResponse<User[] | Message>) {

    const { userName } = req.query
    if (req.method == 'DELETE') {
        await connectMongoDb();
        const user = await User.findOne({ name: userName });
        if (user) {
            await user.remove();
            let updatedUser = await User.find({})

            res.status(200).json(updatedUser.reverse())
        } else {

            res.status(404).json({ message: 'User not found' })
        }
    }
    return res.status(404).json({ message: 'Delete request is forbidden' })


}

export default crudUser

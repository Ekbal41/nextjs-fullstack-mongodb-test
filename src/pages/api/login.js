
import { User, connectMongoDb } from "../../utils/mongodb";
import { Apiuser } from "./createaccount";
import jwt from 'jsonwebtoken';
import cookie from "cookie";


const JWT_EXPIRE = process.env.JWT_EXPIRE || '1d';
const SECRET_KEY = process.env.SECRET_KEY || 'secret2435';


export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'method not allowed' })
    const { name, password } = req.body
    await connectMongoDb()
    const userExist = await Apiuser.findOne({ name });
    if (userExist) {
        if (userExist.password === password) {
            const token = jwt.sign({ id: userExist._id }, SECRET_KEY, { expiresIn: JWT_EXPIRE });
            res.setHeader('Set-Cookie', cookie.serialize('token', token, { httpOnly: true, maxAge : 60 * 60 * 24 * 7}));
            return res.status(200).json({ message: 'user logged in' })
            
        } else {
            return res.status(200).json({ message: 'password is not correct' })
        }

    } else {
        return res.status(200).json({ message: 'no user found ' })
    }
}
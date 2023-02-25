import { Schema, model ,Mongoose, models } from "mongoose";
import {User, connectMongoDb} from "../../utils/mongodb";


const scema = new Schema({
    name: String,
    password: String,
})

export const Apiuser = models.Apiuser || model('Apiuser', scema)


export default async function handler(req, res) {
    const {name, password} = req.body
    const user = new Apiuser({name, password})
    try {
        await connectMongoDb()
        await user.save()
    }
    catch (e) {
        return res.status(500).json({message : 'error'})
    }
   return res.status(200).json({message : 'user created, log in for the api token'})
}
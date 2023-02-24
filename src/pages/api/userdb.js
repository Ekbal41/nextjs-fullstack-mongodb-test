import {User, connectMongoDb} from "../../utils/mongodb";


export default async function handler(req, res) {
    console.log('connecting')
    await connectMongoDb();
   console.log('connected')

   const test = await User.create({name: 'rahul', age: 1})
   return res.json(test)
}
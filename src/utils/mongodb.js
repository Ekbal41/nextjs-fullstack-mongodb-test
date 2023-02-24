import {mongoose, Schema, model, models} from "mongoose";

//create mongose scema for user
const userSchema = new Schema({
    name: String,
    age : String,
})
const User = models.User || model('User', userSchema);


const connectMongoDb = async () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
          })
}

const closeConnection = async () =>{
   mongoose.connection.close()
}

export {
    connectMongoDb,
    User,
    closeConnection,
}


import { MongoClient } from "mongodb";

const URI = 'mongodb+srv://testdb:testdb2023@cluster0.unaqvod.mongodb.net/?retryWrites=true&w=majority'
const options ={}
const client = new MongoClient(URI, options);

//connect to monto db 
const makeConnection = async () => {
    try {
        await client.connect();
        console.log("Connected to mongo");
    } catch (error) {
        console.log(error);
    }
}
//function for closing db connection
const closeConnection = async () => {
    try {
        await client.close();
        console.log("Connection closed");
    } catch (error) {
        console.log(error);
    }
}
//get detabse from mongodb then get collection
const getCollection = (dbName, collectionName) => {
    return client.db(dbName).collection(collectionName);
}

export {
    getCollection,
    makeConnection,
    closeConnection,
}


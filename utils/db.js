import mongoose from "mongoose";
import {DB_NAME} from "./constants.js"


const connection = async() =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Error in connecting db", error.message);
    }
}

export default connection
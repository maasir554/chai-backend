import mongoose, { connect } from "mongoose";
import { DB_NAME } from "../constants.js";
import process from "node:process";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected! DB HOST: ${connectionInstance.connection.host}`)
    } catch (err) {
        console.error("MONGODB connection error ", err);
        process.exit(1);
    }
};

export default connectDB

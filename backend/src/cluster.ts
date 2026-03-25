import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns/promises";

dns.setServers(["1.1.1.1"]);
dotenv.config();
const mongoURI = process.env.MONGO_URI as string;

export async function connectToDB(){
    try{
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected");
    } catch(error){
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

export function closeClusterConnection(){
    return mongoose.connection.close();
}
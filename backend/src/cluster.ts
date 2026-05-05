import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns/promises";

dns.setServers(["1.1.1.1"]);
dotenv.config();

const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;

const mongoConnectUrl = `mongodb://${dbUser}:${dbPassword}@ac-yv0bsb6-shard-00-00.rywcuzx.mongodb.net:27017,ac-yv0bsb6-shard-00-01.rywcuzx.mongodb.net:27017,ac-yv0bsb6-shard-00-02.rywcuzx.mongodb.net:27017/?ssl=true&replicaSet=atlas-tvrczg-shard-0&authSource=admin&appName=budgetApp`

export async function connectToCluster(){
    try{
        await mongoose.connect(mongoConnectUrl);
        console.log("MongoDB connected");
    } catch(error){
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

export function closeClusterConnection(){
    return mongoose.connection.close();
}
import mongoose from "mongoose";
import config from "config";
import log from "./logger";
import dotenv from 'dotenv';
dotenv.config();
async function connect(){
    const dburi = process.env.dburi;
    return await mongoose.connect(dburi as string).then(()=>{
        log.info("Connected to MongoDB");
    }).catch((e)=>{
        log.error("Could not connected to db");
        process.exit(1);
    })
}

export default connect;
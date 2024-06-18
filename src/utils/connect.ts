import mongoose from "mongoose";
import config from "config";
import log from "./logger";

async function connect(){
    const dburi = config.get<string>("dbUri");
    return await mongoose.connect(dburi).then(()=>{
        log.info("Connected to MongoDB");
    }).catch((e)=>{
        log.error("Could not connected to db");
        process.exit(1);
    })
}

export default connect;
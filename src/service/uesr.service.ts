import { Document } from "mongoose";
import User, { userDocument } from "../models/user.model";

export async function createUser(input: Document<userDocument>){
    try{
        return await User.create(input);
    }
    catch(e: any){
        throw new Error(e)
    }
}
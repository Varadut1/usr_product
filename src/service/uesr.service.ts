import { omit } from "lodash";
import User, { userDocument } from "../models/user.model";
import { CreatueUserInput } from "../schema/user.schema";

export async function createUser(input: CreatueUserInput): Promise<Omit<userDocument, 'password'>>{
    try{
        const user = await User.create(input);
        return omit(user.toJSON(), 'password')
    }
    catch(e: any){
        throw new Error(e)
    }
}

export async function getUsers(){
    try{
        return await User.find();
    }
    catch(e: any){
        throw new Error(e);
    }
}

export async function validatePassword( {email, password} : {email: string, password: string}){
    const user = await User.findOne({ email });
    if (!user){
        return false;
    }
    const isValid = await User.comparePassword(password);

    if(!isValid)    return false;

    return omit(user.toJSON(), 'password') as userDocument;

}
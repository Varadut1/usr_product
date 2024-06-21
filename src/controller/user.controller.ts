import { Request, Response } from 'express';
import log from '../utils/logger';
import { createUser, getUsers } from '../service/user.service';
import { CreatueUserInput } from '../schema/user.schema';
import { omit } from 'lodash';

export async function createUserHandler (req: Request<{}, {}, CreatueUserInput>, res: Response){
    try{
        const user = await createUser(req.body);
        return res.status(201).json({
            message: "Success",
            data: user
        })
    }
    catch(e: any){
        log.error(e);
        return res.status(409).json({
            message: e.message
        })
    }
}

export async function getUserHandler(req: Request, res: Response){
    try{
        const allUsers = await getUsers();
        return res.status(200).json({
            message: "Success",
            data: allUsers
        })
    }
    catch(e: any){
        log.error(e);
        return res.status(409).json({
            message: e.message
        });
    }
}
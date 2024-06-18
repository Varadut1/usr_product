import { Request, Response } from 'express';
import log from '../utils/logger';
import { createUser } from '../service/uesr.service';

export async function createUserHandler (req: Request, res: Response){
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
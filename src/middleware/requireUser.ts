import { NextFunction, Request, Response } from "express";

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    if(!user){
        res.status(403).json({
            message: "Token doesnot exist, You have to start a session again with mail and password"
        });
    }
    return next();
}
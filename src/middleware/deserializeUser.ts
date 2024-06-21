import { NextFunction, Response, Request } from "express";
import { get } from "lodash";
import { verifyjwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

export const deserializeUser = async(req: Request, res:Response, next: NextFunction) => {
    const accessToken = get(req, 'headers.authorization', "").replace(/^Bearer\s/, "");
    if(!accessToken)    return next();

    const { decoded, expired } = verifyjwt(accessToken);
    const refreshToken = get(req, 'headers.x-refresh');
    if(decoded && !expired){
        res.locals.user = decoded;
        return next();
    }

    if(expired && refreshToken){
        const newAccessToken = await reIssueAccessToken(refreshToken as string);
        if(newAccessToken!==""){
            res.setHeader('x-access-token', newAccessToken);
        }
        else{
            res.status(403).json({
                message: 'You need to login again, you have been offline for quite a while!'
            })
        }
        const { decoded: newDecoded } = verifyjwt(newAccessToken);
        res.locals.user = newDecoded;
        return next();
    }

    return next();
} 
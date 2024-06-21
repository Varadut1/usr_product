import { Response,Request } from "express";
import { validatePassword } from "../service/user.service";
import { createSession, findSession, updateSession } from "../service/session.service";
import { signjwt } from "../utils/jwt.utils";
import config from "config";

export async function createSessionHandler(req: Request, res: Response){
    // validate password
    const user = await validatePassword(req.body);

    if(!user){
        return res.status(401).json({
            message: "Invalid username or password"
        })
    }
    // create session

    const session = await createSession(user._id as string, req.get('user-agent'));

    //access token

    const accessToken = signjwt(
        {...user, session: session._id},
        { expiresIn: config.get('accessTokenTtl') }
    );

    //refresh token

    const refreshToken = signjwt(
        {...user, session: session._id},
        { expiresIn: config.get('refreshTokenTtl') }
    );
    //return 
    return res.status(200).json({
        message: 'Success',
        accessToken,refreshToken
    })
}

export async function getUserSessionHandler(req:Request, res:Response){
    const userId = res.locals.user._id;
    // console.log("userid ",userId);
    const sessions = await findSession({ user: userId, valid: true });
    return res.status(200).json({
        message: 'Success',
        sessions
    })
}

export async function deleteSessionHandler(req: Request, res: Response){
    const sessionId = res.locals.user.session;
    await updateSession({ _id: sessionId }, { valid: false });
    res.status(200).json({
        message: 'Success',
        accessToken: null,
        refreshToken: null
    })
}
import { Response,Request } from "express";
import { validatePassword } from "../service/uesr.service";
import { createSession } from "../service/session.service";
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

    const accesstoken = signjwt(
        {...user, session: session._id},
        { expiresIn: config.get('accessTokenTtl') }
    );

    //refresh token
    //return 
}
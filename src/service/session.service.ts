import { FilterQuery, UpdateQuery } from "mongoose";
import Session, { sessionDocument } from "../models/session.model";
import { signjwt, verifyjwt } from "../utils/jwt.utils";
import { get } from "lodash";
import { findUser } from "./user.service";
import config from "config";

export async function createSession(userId: string, userAgent: string|undefined){
    const session = await Session.create({ user: userId, userAgent });
    return session;
}

export async function findSession(query: FilterQuery<sessionDocument>){
    return Session.find(query).lean();
}

export async function updateSession(query: FilterQuery<sessionDocument>, update: UpdateQuery<sessionDocument>){
    return Session.updateOne(query, update);   
}

export async function reIssueAccessToken( refreshToken:string ){
    const { decoded } = verifyjwt(refreshToken);
    if(!decoded || !get(decoded, 'session')) return "";
    const session = await Session.findById(get(decoded, 'session'));
    if(!session || !session.valid) return "";
    let user = await findUser({ _id: session.user });
    if(!user) return "";
    user = user.toJSON();
    const accessToken = signjwt(
        {...user, session: session._id},
        { expiresIn: config.get('accessTokenTtl') }
    );
    return accessToken;
}

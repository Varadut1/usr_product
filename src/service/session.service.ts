import Session from "../models/session.model";

export async function createSession(userId: string, userAgent: string|undefined){
    const session = await Session.create({ user: userId, userAgent });
    return session;
}
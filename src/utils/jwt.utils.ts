
import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey:jwt.Secret = process.env.privateKey as string;
const publicKey:jwt.Secret = process.env.publicKey as string;

export function signjwt(object: Object, options?: jwt.SignOptions|undefined){
    const token = jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: 'RS256'
    });
    return token;
}

export function verifyjwt(token: string){
    try{
        const decoded = jwt.verify(token, publicKey);
        return {
            valid: true, 
            expired: false,
            decoded
        }
        
    }
    catch(e:any){
        return {
            valid: false, 
            expired: e.message === 'jwt expired',
            decoded: null
        }
    }
}   
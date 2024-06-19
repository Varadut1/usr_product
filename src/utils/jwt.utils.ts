
import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey:jwt.Secret = config.get('privateKey');
const publicKey:jwt.Secret = config.get('publicKey');

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
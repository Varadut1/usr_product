"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyjwt = exports.signjwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const privateKey = process.env.privateKey;
const publicKey = process.env.publicKey;
function signjwt(object, options) {
    const token = jsonwebtoken_1.default.sign(object, privateKey, Object.assign(Object.assign({}, (options && options)), { algorithm: 'RS256' }));
    return token;
}
exports.signjwt = signjwt;
function verifyjwt(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded
        };
    }
    catch (e) {
        return {
            valid: false,
            expired: e.message === 'jwt expired',
            decoded: null
        };
    }
}
exports.verifyjwt = verifyjwt;

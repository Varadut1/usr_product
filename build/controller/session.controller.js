"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSessionHandler = exports.getUserSessionHandler = exports.createSessionHandler = void 0;
const user_service_1 = require("../service/user.service");
const session_service_1 = require("../service/session.service");
const jwt_utils_1 = require("../utils/jwt.utils");
const config_1 = __importDefault(require("config"));
function createSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // validate password
        const user = yield (0, user_service_1.validatePassword)(req.body);
        if (!user) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }
        // create session
        const session = yield (0, session_service_1.createSession)(user._id, req.get('user-agent'));
        //access token
        const accessToken = (0, jwt_utils_1.signjwt)(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: config_1.default.get('accessTokenTtl') });
        //refresh token
        const refreshToken = (0, jwt_utils_1.signjwt)(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: config_1.default.get('refreshTokenTtl') });
        //return 
        return res.status(200).json({
            message: 'Success',
            accessToken, refreshToken
        });
    });
}
exports.createSessionHandler = createSessionHandler;
function getUserSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        // console.log("userid ",userId);
        const sessions = yield (0, session_service_1.findSession)({ user: userId, valid: true });
        return res.status(200).json({
            message: 'Success',
            sessions
        });
    });
}
exports.getUserSessionHandler = getUserSessionHandler;
function deleteSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sessionId = res.locals.user.session;
        yield (0, session_service_1.updateSession)({ _id: sessionId }, { valid: false });
        res.status(200).json({
            message: 'Success',
            accessToken: null,
            refreshToken: null
        });
    });
}
exports.deleteSessionHandler = deleteSessionHandler;

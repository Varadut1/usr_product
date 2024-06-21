"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireUser = void 0;
const requireUser = (req, res, next) => {
    const user = res.locals.user;
    if (!user) {
        res.status(403).json({
            message: "Token doesnot exist, You have to start a session again with mail and password"
        });
    }
    return next();
};
exports.requireUser = requireUser;

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserHandler = exports.createUserHandler = void 0;
const user_service_1 = require("../service/user.service");
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.createUser)(req.body);
            return res.status(201).json({
                message: "Success",
                data: user
            });
        }
        catch (e) {
            console.log(e);
            return res.status(409).json({
                message: e.message
            });
        }
    });
}
exports.createUserHandler = createUserHandler;
function getUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allUsers = yield (0, user_service_1.getUsers)();
            return res.status(200).json({
                message: "Success",
                data: allUsers
            });
        }
        catch (e) {
            console.log(e);
            return res.status(409).json({
                message: e.message
            });
        }
    });
}
exports.getUserHandler = getUserHandler;

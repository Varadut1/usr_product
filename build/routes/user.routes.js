"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controller/user.controller");
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const user_schema_1 = require("../schema/user.schema");
const session_controller_1 = require("../controller/session.controller");
const session_schema_1 = require("../schema/session.schema");
const requireUser_1 = require("../middleware/requireUser");
function routes(app) {
    app.get('/api/users', user_controller_1.getUserHandler);
    app.post('/api/users', (0, validateResource_1.default)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    app.post('/api/sessions', (0, validateResource_1.default)(session_schema_1.createSessionSchema), session_controller_1.createSessionHandler);
    app.get('/api/sessions', requireUser_1.requireUser, session_controller_1.getUserSessionHandler);
    app.delete('/api/sessions', requireUser_1.requireUser, session_controller_1.deleteSessionHandler);
}
exports.default = routes;

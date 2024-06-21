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
const express_1 = __importDefault(require("express"));
const connect_1 = __importDefault(require("./utils/connect"));
const logger_1 = __importDefault(require("./utils/logger"));
const health_routes_1 = __importDefault(require("./routes/health.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const deserializeUser_1 = require("./middleware/deserializeUser");
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const port = process.env.port;
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.json());
dotenv_1.default.config();
app.use(deserializeUser_1.deserializeUser);
app.listen(process.env.port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connect_1.default)();
    logger_1.default.info(`App is running at http://localhost:${port}`);
    (0, health_routes_1.default)(app);
    (0, user_routes_1.default)(app);
    (0, product_routes_1.default)(app);
}));

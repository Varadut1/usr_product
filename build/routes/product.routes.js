"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const requireUser_1 = require("../middleware/requireUser");
const product_schema_1 = require("../schema/product.schema");
const product_controller_1 = require("../controller/product.controller");
function routes(app) {
    app.post('/api/products', requireUser_1.requireUser, (0, validateResource_1.default)(product_schema_1.createProductSchema), product_controller_1.createProductHandler);
    app.put('/api/products/:productId', requireUser_1.requireUser, (0, validateResource_1.default)(product_schema_1.updateProductSchema), product_controller_1.updateProductHandler);
    app.get('/api/products/:productId', (0, validateResource_1.default)(product_schema_1.getProductSchema), product_controller_1.getProductHandler);
    app.delete('/api/products/:productId', requireUser_1.requireUser, (0, validateResource_1.default)(product_schema_1.deleteProductSchema), product_controller_1.deleteProductHandler);
}
exports.default = routes;

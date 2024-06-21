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
exports.deleteProductHandler = exports.getProductHandler = exports.updateProductHandler = exports.createProductHandler = void 0;
const product_service_1 = require("../service/product.service");
function createProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = res.locals.user._id;
        // Destructure the required properties from req.body
        const { title, description, price, image } = req.body;
        try {
            const product = yield (0, product_service_1.createProduct)({
                user,
                title,
                description,
                price,
                image,
            });
            return res.status(201).send(product);
        }
        catch (error) {
            console.error("Error creating product:", error);
            return res.status(500).json({ message: "Failed to create product" });
        }
    });
}
exports.createProductHandler = createProductHandler;
function updateProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const productId = req.params.productId;
        const update = req.body;
        try {
            const product = yield (0, product_service_1.findProduct)({ _id: productId });
            if (!product) {
                return res.sendStatus(404);
            }
            if (String(product.user) !== userId) {
                return res.sendStatus(403);
            }
            const updatedProduct = yield (0, product_service_1.findAndUpdateProduct)({ _id: productId }, update, { new: true });
            return res.send(updatedProduct);
        }
        catch (error) {
            console.error("Error updating product:", error);
            return res.status(500).json({ message: "Failed to update product" });
        }
    });
}
exports.updateProductHandler = updateProductHandler;
function getProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log("here");
        const productId = req.params.productId;
        try {
            const product = yield (0, product_service_1.findProduct)({ _id: productId });
            if (!product) {
                return res.sendStatus(404);
            }
            return res.send(product);
        }
        catch (error) {
            console.error("Error retrieving product:", error);
            return res.status(500).json({ message: "Failed to retrieve product" });
        }
    });
}
exports.getProductHandler = getProductHandler;
function deleteProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const productId = req.params.productId;
        try {
            const product = yield (0, product_service_1.findProduct)({ _id: productId });
            if (!product) {
                return res.sendStatus(404);
            }
            if (String(product.user) !== userId) {
                return res.sendStatus(403);
            }
            const deleteditem = yield (0, product_service_1.deleteProduct)({ _id: productId });
            return res.sendStatus(200).json({
                message: "Success",
                deleteditem
            });
        }
        catch (error) {
            console.error("Error deleting product:", error);
            return res.status(500).json({ message: "Failed to delete product" });
        }
    });
}
exports.deleteProductHandler = deleteProductHandler;

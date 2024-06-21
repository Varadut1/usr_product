"use strict";
// Validating request against the schema using zod
Object.defineProperty(exports, "__esModule", { value: true });
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
    }
    catch (e) {
        // console.log(req.body, req.query, req.params);
        return res.status(400).send(e.errors);
    }
};
exports.default = validate;

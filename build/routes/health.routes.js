"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function routes(app) {
    app.get('/', (req, res) => {
        res.status(200).json({
            data: 'Welcome to the Product management API. This is made using TypeScript, Node, Express, MongoDB and Zod. Available routes:- GET: /, POST: /api/users, [POST, GET, DELETE]: /api/sessions, POST: /api/products, [GET,PUT,DELETE]: /api/products'
        });
    });
}
exports.default = routes;

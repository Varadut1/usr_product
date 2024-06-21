import {Express, Request, Response} from 'express';
import { createUserHandler } from '../controller/user.controller';


function routes(app:Express){
    app.get('/', (req:Request, res:Response) => {
        res.status(200).json({
            data: 'Welcome to the Product management API. This is made using TypeScript, Node, Express, MongoDB and Zod. Available routes:- GET: /, POST: /api/users, [POST, GET, DELETE]: /api/sessions, POST: /api/products, [GET,PUT,DELETE]: /api/products'
        })
    });
}

export default routes;
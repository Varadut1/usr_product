import {Express, Request, Response} from 'express';
import { createUserHandler } from '../controller/user.controller';


function routes(app:Express){
    app.get('/heathcheck', (req:Request, res:Response) => {
        res.status(200).json({
            data: 'K-OK!'
        })
    });
}

export default routes;
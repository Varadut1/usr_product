import {Express, Request, Response} from 'express';
import { createUserHandler } from '../controller/user.controller';

function routes(app:Express){
    app.post('/api/users', createUserHandler);
}

export default routes;
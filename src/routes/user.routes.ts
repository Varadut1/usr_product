import {Express, Request, Response} from 'express';
import { createUserHandler, getUserHandler } from '../controller/user.controller';
import validate from '../middleware/validateResource';
import { createUserSchema } from '../schema/user.schema';

function routes(app:Express){
    app.get('/api/users', getUserHandler);
    app.post('/api/users', validate(createUserSchema), createUserHandler);
}

export default routes;
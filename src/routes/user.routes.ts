import {Express, Request, Response} from 'express';
import { createUserHandler, getUserHandler } from '../controller/user.controller';
import validate from '../middleware/validateResource';
import { createUserSchema } from '../schema/user.schema';
import { createSessionHandler, deleteSessionHandler, getUserSessionHandler } from '../controller/session.controller';
import { createSessionSchema } from '../schema/session.schema';
import { requireUser } from '../middleware/requireUser';

function routes(app:Express){
    app.get('/api/users', getUserHandler);
    app.post('/api/users', validate(createUserSchema), createUserHandler);
    app.post('/api/sessions', validate(createSessionSchema), createSessionHandler);
    app.get('/api/sessions', requireUser, getUserSessionHandler);
    app.delete('/api/sessions', requireUser, deleteSessionHandler);
}

export default routes;
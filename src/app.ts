import express from 'express'
import config from 'config';
import connect from './utils/connect';
import log from './utils/logger';
import healthroute from './routes/health.routes';
import userroute from './routes/user.routes';
import productroute from './routes/product.routes';
import morgan from 'morgan'
import bodyParser from 'body-parser';
import { deserializeUser } from './middleware/deserializeUser';

const app = express();
const port = config.get<string>("port");
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(deserializeUser)

app.listen(port, async()=>{
    await connect();
    log.info(`App is running at http://localhost:${port}`);
    healthroute(app);
    userroute(app);
    productroute(app);
})
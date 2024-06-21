import express from 'express'
import config from 'config';
import connect from './utils/connect';
// import log from './utils/logger';
import healthroute from './routes/health.routes';
import userroute from './routes/user.routes';
import productroute from './routes/product.routes';
import morgan from 'morgan'
import bodyParser from 'body-parser';
import { deserializeUser } from './middleware/deserializeUser';
import dotenv from 'dotenv';

const app = express();
const port = process.env.port;
app.use(morgan('dev'));
app.use(bodyParser.json());
dotenv.config();
app.use(deserializeUser)

app.listen(process.env.port, async()=>{
    await connect();
    console.log(`App is running at http://localhost:${port}`);
    healthroute(app);
    userroute(app);
    productroute(app);
})
import express from 'express';
import { Request, Response } from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import cookieparser from 'cookie-parser';
dotenv.config();
import connect from './utils/connect';
const PORT = parseInt(process.env.PORT ?? `5173`, 10);
const app = express();
import logger from './utils/logger';
import routes from './routes/routes';
import deserializeUser from './middleware/deserializeUser';
/* middlewares */
app.use(cookieparser('6*7d-dN5x2V4'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(deserializeUser);
const server = http.createServer(app);

app.get('/', (req: Request, res: Response) => {
  res.json({
    msg: 'hello world',
  });
});

server.listen(PORT, async () => {
  logger.info(`http://localhost:${PORT}`);
  await connect(); // Database conncetion
  routes(app);
});

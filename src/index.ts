import express from 'express';
import { Request, Response } from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import cookieparser from 'cookie-parser';
dotenv.config();
const PORT = process.env.PORT ?? 5173;
const app = express();

/* middlewares */
app.use(cookieparser('6*7d-dN5x2V4'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const server = http.createServer(app);

app.get('/', (req: Request, res: Response) => {
  res.json({
    msg: 'hello world',
  });
});

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

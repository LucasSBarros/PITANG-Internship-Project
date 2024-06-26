import cors from 'cors';
import express, { request, response } from 'express';
import 'express-async-errors'
import helmet from 'helmet';
import morgan from 'morgan';

import fallbackMiddleware from './middleweres/fallback.middleware.mjs';
import { privateRouter, publicRouter } from './routes/router.mjs';

import './routes/product.router.mjs';
import './routes/user.router.mjs'


const PORT = process.env.PORT || 3000;

const server = express();

server.use(helmet());
server.use(morgan('combined'));
server.use(cors());
server.use(express.json());
server.use(publicRouter);
server.use(privateRouter);
server.use(fallbackMiddleware);

server.use('*', (request, response) => {
    response.status(404).send({ message: 'Route not found' })
});


server.listen(PORT, () => {
    console.log(`Estou rodando na porta ${PORT}`);
});
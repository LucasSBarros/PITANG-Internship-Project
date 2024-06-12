import cors from 'cors';
import express, { request, response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import productRoutes from './routes/product.router.mjs';

const PORT = process.env.PORT || 3000;

const server = express();

server.use(helmet());
server.use(morgan('combined'));
server.use(cors());
server.use(express.json());
server.use(productRoutes);
server.use('*', (request, response) => {
    response.status(404).send({ message: 'Route not found' })
});


server.listen(PORT, () => {
    console.log(`Estou rodando na porta ${PORT}`);
});
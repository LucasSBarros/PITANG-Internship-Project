import express from 'express';
import productRoutes from './routes/product.router.mjs';

const PORT = process.env.PORT || 3000;

const server = express();

server.use(express.json());
server.use(productRoutes);

server.listen(PORT, () => {
    console.log(`Estou rodando na porta ${PORT}`);
});
import { Router } from 'express';
import ProductController from '../controllers/product.controller.mjs';

const routes = Router();

const productController = new ProductController();

routes.get('/api/product', (request, response) => productController.index(request, response));
routes.get('/api/product/:id', (request, response) => productController.getOne(request, response));
routes.post('/api/product', (request, response) => productController.store(request, response));
routes.put('/api/product/:id', (request, response) => productController.update(request, response));
routes.delete('/api/product/:id', (request, response) => productController.destroy(request, response));

export default routes;
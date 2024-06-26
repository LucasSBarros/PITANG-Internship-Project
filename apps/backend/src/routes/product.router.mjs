import ProductController from '../controllers/product.controller.mjs';
import { publicRouter, privateRouter } from './router.mjs';

const productController = new ProductController();

privateRouter.get('/api/product', (request, response) => productController.index(request, response));
privateRouter.get('/api/product/:id', (request, response) => productController.getOne(request, response));
privateRouter.post('/api/product', (request, response) => productController.store(request, response));
privateRouter.put('/api/product/:id', (request, response) => productController.update(request, response));
privateRouter.delete('/api/product/:id', (request, response) => productController.destroy(request, response));
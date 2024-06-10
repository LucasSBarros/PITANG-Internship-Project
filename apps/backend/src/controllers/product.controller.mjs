import z from 'zod';
import crypto from 'node:crypto'

const productSchema = z.object({
    id: z.string().optional(),
    nome: z.string().min(1, "O nome é obrigatório!"),
    preco: z.number().positive("Preço deve ser um valor positivo!"),
    descricao: z.string().optional(),
    quantidade: z.number().int().nonnegative("A quantidade deve ser um número inteiro não negativo!"),
  });

  let products = [];

export default class ProductController{
    
    index(request, response) {
        response.send({
            page: 1,
            pageSize: 20,
            totalCount: products.length,
            items: products
        });

    };

    getOne(request, response) {   
        const {id} = request.params;
        const product = products.find((product) => product.id === id );

        if (!product){
            return response.status(404).send({message: 'Product not found.'})
        }
        
        response.send(product);

    };

    store(request, response) {
        const product = request.body;
        const {sucess, data, error} = productSchema.safeParse(product);

        if (error) {
            return response.status(400).send(error);
        }

        const [id] = crypto.randomUUID().split("-");

        data.id = id

        products.push(data);

        response.send({message: 'store', data});
       
    };

    update(request, response) {
        const { id } = request.params;
        const { nome } = request.body;
        const { preco } = request.body;
        const { descricao } = request.body;
        const { quantidade } = request.body;
  
        const newProducts = products.map((product) => {
        if (product.id === id) {
            return { ...product, nome, preco, descricao, quantidade };
        }

        return product;
    });
  
    products = newProducts;
    response.status(201).send({ message: 'Product Updated' });
    };

    destroy(request, response) {
        
        const { id } = request.params;

        products = products.filter((product) => product.id !== id);

        response.status(204).send()

    };
}

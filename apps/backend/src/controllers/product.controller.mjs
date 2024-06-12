import crypto, { hash } from 'node:crypto'
import z from 'zod';
import prismaClient from '../utils/prismaClient.mjs';

const productSchema = z.object({
    id: z.string().optional(),
    nome: z.string().min(1, "O nome é obrigatório!"),
    preco: z.number().positive("Preço deve ser um valor positivo!"),
    descricao: z.string().optional(),
    quantidade: z.number().int().nonnegative("A quantidade deve ser um número inteiro não negativo!"),
    
  });

export default class ProductController{
    
    async index(request, response) {
       
       const products = await prismaClient.product.findMany()
       
        response.send({
            page: 1,
            pageSize: 20,
            totalCount: products.length,
            items: products
        });

    };

    async getOne(request, response) {   
        const {id} = request.params;
        
        const product = await prismaClient.product.findUnique({ where: { id }});

        if (!product){
            return response.status(404).send({message: 'Product not found.'})
        }
        
        response.send(product);

    };

    async store(request, response) {
        const product = request.body;
        const {sucess, data, error} = productSchema.safeParse(product);

        if (error) {
            return response.status(400).send(error);
        }
          
        const newProduct = await prismaClient.product.create({data: {
            nome: data.nome, 
            preco: data.preco, 
            descricao: data.descricao, 
            quantidade: data.quantidade,
            user: {
                connectOrCreate: {
                    create: {
                        nome: 'Lucas Barros',
                        email: 'lsb5@cesar.school',
                        password: '123456'
                        
                    },
                    where: { email: 'lsb5@cesar.school' },
                },
            },
        }});
   
        response.send({message: 'store', newProduct});    
    };

    async update(request, response) {
        const { id } = request.params;
        const { nome } = request.body;
        const { preco } = request.body;
        const { descricao } = request.body;
        const { quantidade } = request.body;
  
        await prismaClient.product.update({
            data: {nome, preco, descricao, quantidade}, 
            where: { id },
        }); 
    
        response.status(201).send({ message: 'Product Updated' });
    };

    async destroy(request, response) {
        
        const { id } = request.params;

        try{
            await prismaClient.product.delete({where: { id }});
            response.status(204).send()

        }catch (error){
            response.status(404).send({message: 'Product not found.'})

        }
    };
}

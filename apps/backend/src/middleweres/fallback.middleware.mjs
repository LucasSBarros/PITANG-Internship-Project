export default function fallbackMiddleware(error, request, resposnse, next){
    console.error(error.stack);

    const statusCode = error.statusCode || 500;

    resposnse.status(statusCode).send({ message: error.message});
}
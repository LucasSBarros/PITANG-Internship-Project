import { Router } from "express";
import authMiddleware from "../middleweres/auth.middleware.mjs";

const publicRouter = Router();
const privateRouter = Router();

privateRouter.use(authMiddleware);

export { publicRouter, privateRouter };
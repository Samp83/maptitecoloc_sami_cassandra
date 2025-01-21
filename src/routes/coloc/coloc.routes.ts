import { Router } from 'express';
import * as colocController from "../../controllers/coloc.controller";
import { authMiddleware } from '../../middleware/auth.middleware';

const routes = Router();

// Route pour l'inscription d'un coloc, requiert un token d'authentification
routes.post("/register", authMiddleware, colocController.registerColoc);
routes.delete("/:id", colocController.deleteColoc);



export default routes;
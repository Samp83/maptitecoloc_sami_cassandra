import { Router } from 'express';
import * as colocController from "../../controllers/coloc.controller";
import { authMiddleware } from '../../middleware/auth.middleware';

const routes = Router();

// Route pour l'inscription d'un coloc, requiert un token d'authentification
routes.post("/register", authMiddleware, colocController.registerColoc);
routes.delete("/:id", authMiddleware, colocController.deleteColoc);
routes.post("/:id/add-member", authMiddleware, colocController.addMember);
routes.post("/:id/remove-member", authMiddleware, colocController.removeMember);
routes.post("/:id/transfer-ownership", authMiddleware, colocController.transferOwnership);
routes.get("/:id/", colocController.getColocMembers);

export default routes;
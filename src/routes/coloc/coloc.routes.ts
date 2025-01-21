import { Router } from 'express';
import * as colocController from "../../controllers/coloc.controller";
import { authMiddleware } from '../../middleware/auth.middleware';

const routes = Router();

// Route pour enregistrer une colocation
routes.post("/register", authMiddleware, colocController.registerColoc);

// Route pour supprimer une colocation
routes.delete("/:id", authMiddleware, colocController.deleteColoc);

// Route pour ajouter un membre à une colocation
routes.post("/:id/add-member", authMiddleware, colocController.addMember);

// Route pour supprimer un membre d'une colocation
routes.post("/:id/remove-member", authMiddleware, colocController.removeMember);

// Route pour changer le propriétaire d'une colocation
routes.post("/:id/transfer-ownership", authMiddleware, colocController.transferOwnership);

// Route pour récupérer les membres d'une colocation
routes.get("/:id/", colocController.getColocMembers);

export default routes;
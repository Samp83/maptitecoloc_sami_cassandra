import { Router } from 'express';
import * as financeController from "../../controllers/finance.controller";
import { authMiddleware } from '../../middleware/auth.middleware';

const routes = Router();

// Route pour ajouter un frais
routes.post("/:colocId/add-charge", authMiddleware, financeController.addCharge);

// Route pour supprimer un frais
routes.delete("/:id/remove-charge", authMiddleware, financeController.removeCharge);

// Route pour rembourser un membre
routes.post("/:id/pay-member", authMiddleware, financeController.payMember);

export default routes;
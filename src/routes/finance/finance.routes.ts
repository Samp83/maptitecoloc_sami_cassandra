import { Router } from 'express';
import * as financeController from "../../controllers/finance.controller";
import { authMiddleware } from '../../middleware/auth.middleware';

const routes = Router();

routes.post("/:colocId/add-charge", authMiddleware, financeController.addCharge);
routes.delete("/:id/remove-charge", authMiddleware, financeController.removeCharge);
routes.post("/:id/pay-member", authMiddleware, financeController.payMember);

export default routes;
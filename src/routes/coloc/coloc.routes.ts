import { Router } from 'express';
import * as colocController from "../../controllers/coloc.controller";
// import { authenticate } from "../middlewares/auth.middleware";

const routes = Router();

// Route pour l'inscription d'un coloc
routes.post("/register", colocController.registerColoc);



export default routes;
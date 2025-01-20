import { Router } from 'express';
import * as userController from "../../controllers/user.controller";
// import { authenticate } from "../middlewares/auth.middleware";

const routes = Router();

// Route pour l'inscription d'un utilisateur
routes.post("/register", userController.registerUser);

// Route pour la connexion d'un utilisateur
routes.post("/login", userController.loginUser);

routes.get("/", userController.getAllUsers);
routes.get("/:id", userController.getUserById);
routes.put("/:id", userController.updateUser);
routes.delete("/:id", userController.deleteUser);

routes.get("/me", /* authenticate, userController.getUserProfile */);

export default routes;
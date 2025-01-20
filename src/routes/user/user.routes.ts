import { Router } from 'express';
import * as userController from "../../controllers/user.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const routes = Router();

// Route pour l'inscription d'un utilisateur
routes.post("/register", userController.registerUser);

// Route pour la connexion d'un utilisateur
routes.post("/login", userController.loginUser);

// Route pour récupérer le profil de l'utilisateur connecté
routes.get("/me", authMiddleware, userController.getUserProfile);

routes.get("/", userController.getAllUsers);
routes.get("/:id", userController.getUserById);
routes.put("/:id", userController.updateUser);
routes.delete("/:id", userController.deleteUser);

export default routes;
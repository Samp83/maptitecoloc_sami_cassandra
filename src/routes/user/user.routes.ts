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

// Routes pour récuperer tous les utilisateurs
routes.get("/", userController.getAllUsers);

// Routes pour récuperer un utilisateur par son id
routes.get("/:id", userController.getUserById);

// Routes pour mettre à jour un utilisateur
routes.put("/:id", userController.updateUser);

// Routes pour supprimer un utilisateur
routes.delete("/:id", userController.deleteUser);

export default routes;
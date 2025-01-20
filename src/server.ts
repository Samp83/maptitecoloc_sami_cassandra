import dotenv from "dotenv";
import app from "./app";
import { connectMySQLDB } from "./configs/databases/mysql.config";

dotenv.config();

const PORT = process.env.PORT || 3000;

connectMySQLDB.initialize().then(() => {
  console.log("Connected to MySQL!");

  // Lancer le serveur
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error("Failed to initialize database:", error);
  process.exit(1); // Arrêter le processus si une connexion échoue
});
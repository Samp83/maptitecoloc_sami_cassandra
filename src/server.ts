import dotenv from "dotenv";
import app from "./app";
import { connectMySQLDB } from "./configs/databases/mysql.config";
import { connectMongooseDB } from "./configs/databases/mongoose.config";

dotenv.config();

const PORT = process.env.PORT || 3000;

connectMySQLDB
  .initialize()
  .then(() => {
    console.log("Connected to MySQL!");

 
    connectMongooseDB()
      .then(() => {
        console.log("Connected to MongoDB");

        
        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
        });
      })
      .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1); 
      });
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error);
    process.exit(1); 
  });

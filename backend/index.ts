import express, { Router } from "express";
import cors from "cors";
import { registerRoutes } from "./routes/registerRoutes";
// Création de l'application Express
const app = express();

// Activation de CORS (Cross-Origin Resource Sharing)
// Permet au serveur client de faire des appels à l'API sans bloquage du navigateur
app.use(cors());

// Middleware pour parser automatiquement le JSON dans les requêtes entrantes
app.use(express.json());

// Création d'un routeur principal pour l'API
const apiRouter = Router();

// Enregistrement de toutes les routes de l'application sur le routeur principal
registerRoutes(apiRouter);
app.use(apiRouter);

// Lancement du serveur sur un port
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
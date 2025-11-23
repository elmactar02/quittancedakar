import { Router } from "express"
import { locataireController } from "./LocataireController";

const locataireRouter = Router();

locataireRouter.get("/", locataireController.getAllLocataires);
locataireRouter.get("/:id", locataireController.getLocataireById);
locataireRouter.post("/", locataireController.createLocataire);
locataireRouter.patch("/:id", locataireController.updateLocataire);

// On exporte le routeur configuré directement
export { locataireRouter as LocatairesRoutes };
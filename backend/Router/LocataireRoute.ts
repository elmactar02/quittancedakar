import { Router } from "express";
import * as locataireControler from "../Controller/LocataireController"

// Initialisation du routeur
const LocataireRouter = Router();

//Définition des routers
LocataireRouter.get("/locataire", ()=>{});
LocataireRouter.get("/locataire/quittances/:id",locataireControler.getQuittances)
export default LocataireRouter; 
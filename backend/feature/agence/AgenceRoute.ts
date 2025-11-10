import { Router } from 'express';
import { Request,Response } from 'express';
import * as agenceController from "./AgenceController"
function test(req: Request, res: Response) {
    console.log("Msg");
    res.status(204).json({message: "Success"})    
}
// Initialisation du routeur
const AgenceRouter = Router();

//Définition des routers
AgenceRouter.get("/agence",agenceController.getAgency);
AgenceRouter.get("/agence/locataires/:id",agenceController.getLocataires) ;
export default AgenceRouter; 
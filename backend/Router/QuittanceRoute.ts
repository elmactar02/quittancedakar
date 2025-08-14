import { Router } from "express";
import * as quittanceControler from "../Controller/QuittanceController"
// Initialisation du routeur
const QuittanceRouter = Router();

//Définition des routers
QuittanceRouter.get("/quittance", ()=>{});
QuittanceRouter.get("/quittance/get",quittanceControler.printQuittance) ;
export default QuittanceRouter; 
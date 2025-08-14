import { Request,Response } from "express";
import * as locataireData from "../data/dataControler";

export function getQuittances(req:Request,res:Response):void{
    res.json(locataireData.listReceiptsForTenant(req.params.id)) ;
}


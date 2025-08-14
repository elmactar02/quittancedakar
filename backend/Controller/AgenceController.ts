import { Request,Response } from "express";
import * as AgenceData from "../data/dataControler";

export function getAgency(req:Request,res:Response):void{
    const {email} = req.body;
    res.json(AgenceData.findAgencyByEmail(email));
}

export function getLocataires(req:Request,res:Response):void{
    res.json(AgenceData.findalltenants(req.params.id));
}
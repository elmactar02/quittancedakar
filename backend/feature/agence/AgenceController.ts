import { Request,Response } from "express";

export function getAgency(req:Request,res:Response):void{
    const {email} = req.body;
}

export function getLocataires(req:Request,res:Response):void{
}
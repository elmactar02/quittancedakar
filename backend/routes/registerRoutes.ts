import { Router } from "express";
import { LocatairesRoutes } from "../feature/locataire";

export async function registerRoutes(appRouter :Router){
    appRouter.use('/api/locataires', LocatairesRoutes);
}

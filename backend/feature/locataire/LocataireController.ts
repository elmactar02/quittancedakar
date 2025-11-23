import { locataireRepository } from "./LocataireRepository";
import { Locataire } from "./LocataireTypes";
import { Request, Response } from "express";

class LocataireController {
    public async createLocataire(req : Request, res : Response) : Promise<Locataire> {
        let createdLocataire :Locataire;
        const locataireData = req.body;
        createdLocataire = await locataireRepository.createLocataire(locataireData);
        if(!createdLocataire) res.status(500).send("Erreur lors de la création du locataire");
        res.status(201).json(createdLocataire);
        return createdLocataire;
    }

    async getLocataireById(req : Request, res : Response) : Promise<Locataire | null> { 
        const locataireId = req.params.id;
        const locataire = await locataireRepository.getLocataireById(locataireId);
        if(!locataire) {
            res.status(404).send("Locataire non trouvé");
            throw new Error("Locataire non trouvé");
        }
        res.status(200).json(locataire);
        return locataire;
    }

    async getAllLocataires(req : Request, res : Response) : Promise<Locataire[]> {
        const locataires = await locataireRepository.getAllLocataires();
        res.status(200).json(locataires);
        return locataires;
    }

    async updateLocataire(req : Request, res : Response) : Promise<Locataire> {
        const locataireId = req.params.id;
        const updateData = req.body;
        const updatedLocataire = await locataireRepository.update(locataireId, updateData);
        if(!updatedLocataire) {
            res.status(500).send("Erreur lors de la mise à jour du locataire");
            throw new Error("Erreur lors de la mise à jour du locataire");
        }
        res.status(200).json(updatedLocataire);
        return updatedLocataire;
    }   
}

export const locataireController = new LocataireController();
import { createPrismaLocataire, Locataire, updatePrismaLocataire } from "./LocataireTypes";
import prisma  from "../../prisma/prisma";

class LocataireRepository {

  async createLocataire(locataireData :createPrismaLocataire) :Promise<Locataire> {
    return prisma.locataire.create({ 
        data: locataireData,
    });
  }

  async update(locataireid :string, updateData :updatePrismaLocataire) :Promise<Locataire> {
    return prisma.locataire.update({
      where: { id: locataireid },
      data: updateData,
    });
  }

  async getLocataireById(locataireId :string) :Promise<Locataire | null> {
    return prisma.locataire.findUnique({
      where: { id: locataireId },
    });
  }

  async getAllLocataires() :Promise<Locataire[]> {
    return prisma.locataire.findMany();
  }
}

export const locataireRepository = new LocataireRepository();
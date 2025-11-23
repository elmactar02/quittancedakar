import { z } from 'zod';
import { Prisma } from '@prisma/client';

export const LocataireSchema = z.object({
  id: z.uuid(),
  userId: z.uuid,
  name: z.string(),
  email: z.string(),
  adresse: z.string(),
  role: z.string().nullable(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});
export type Locataire = z.infer<typeof LocataireSchema>;
export type createPrismaLocataire = Prisma.LocataireCreateInput;
export type updatePrismaLocataire = Prisma.LocataireUpdateInput;

export const detailedLocataireSchema = LocataireSchema.extend({
  user : z.object({
    id: z.uuid(),
  }),
  quittances: z.array(z.object({
    id: z.uuid(),
  })),
  agence: z.object({
    id: z.uuid(),
  }),
});

export type DetailedLocataire = z.infer<typeof detailedLocataireSchema>;

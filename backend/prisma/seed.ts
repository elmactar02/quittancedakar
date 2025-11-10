import { PrismaClient } from '../src/config/client/client';
import bcrypt from 'bcryptjs';
import "dotenv/config";

import {
  users,
  fakerUser,
  agences,
  agencyEmployees,
  locataires,
  fakerLocataire,
  quittances,
} from '../fixtures';

const prisma = new PrismaClient();

/**
 * Nettoie la base de données en supprimant tous les enregistrements
 * @async
 * @function cleanDatabase
 * @returns {Promise<void>}
 */
async function cleanDatabase() {
  const safe = async (label: string, fn: () => Promise<unknown>) => {
    try {
      await fn();
    } catch (err: any) {
      // Ignore P2021 (table not found) and log others
      if (!(err && err.code === 'P2021')) {
        console.warn(`[seed] cleanup warning on ${label}:`, err?.message || err);
      }
    }
  };

  console.log('🧹 Nettoyage de la base de données...');
  
  await safe('quittance', () => prisma.quittance.deleteMany());
  await safe('locataire', () => prisma.locataire.deleteMany());
  await safe('agencyEmployee', () => prisma.agencyEmployee.deleteMany());
  await safe('agence', () => prisma.agence.deleteMany());
  await safe('user', () => prisma.user.deleteMany());
  
  console.log('✅ Base de données nettoyée');
}

/**
 * Fonction principale pour peupler la base de données
 * @async
 * @function main
 * @returns {Promise<void>}
 */
async function main() {
  console.log('🌱 Début du seeding...');
  
  await cleanDatabase();

  // Création des utilisateurs fixes
  console.log('👥 Création des utilisateurs fixes...');
  const fixedUsersPromises = users.map(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return prisma.user.upsert({
      where: { email: user.email },
      update: {
        ...user,
        password: hashedPassword,
      },
      create: {
        ...user,
        password: hashedPassword,
      },
    });
  });

  // Création des utilisateurs aléatoires
  console.log('🎲 Création des utilisateurs aléatoires...');
  const randomUsersPromises = Array.from({ length: 5 }).map(async () => {
    const { user } = await fakerUser();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return prisma.user.upsert({
      where: { email: user.email },
      update: {
        ...user,
        password: hashedPassword,
      },
      create: {
        ...user,
        password: hashedPassword,
      },
    });
  });

  const allUsers = await Promise.all([...fixedUsersPromises, ...randomUsersPromises]);
  console.log(`✅ ${allUsers.length} utilisateurs créés`);

  // Création des agences
  console.log('🏢 Création des agences...');
  const agencePromises = agences.map((agence) =>
    prisma.agence.upsert({
      where: { email: agence.email },
      update: agence,
      create: agence,
    })
  );
  const createdAgences = await Promise.all(agencePromises);
  console.log(`✅ ${createdAgences.length} agences créées`);

  // Création des employés d'agence
  console.log('👨‍💼 Création des employés d\'agence...');
  const employeePromises = agencyEmployees.map((employee) =>
    prisma.agencyEmployee.upsert({
      where: { userId: employee.userId },
      update: employee,
      create: employee,
    })
  );
  await Promise.all(employeePromises);
  console.log(`✅ ${agencyEmployees.length} employés créés`);

  // Création des locataires fixes
  console.log('🏠 Création des locataires fixes...');
  const fixedLocatairePromises = locataires.map((locataire) =>
    prisma.locataire.upsert({
      where: { email: locataire.email },
      update: locataire,
      create: locataire,
    })
  );

  // Création des locataires aléatoires
  console.log('🎲 Création des locataires aléatoires...');
  const randomLocatairePromises = Array.from({ length: 3 }).map(async () => {
    const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
    const locataire = await fakerLocataire(randomUser.id);
    return prisma.locataire.upsert({
      where: { email: locataire.email },
      update: locataire,
      create: locataire,
    });
  });

  const allLocataires = await Promise.all([...fixedLocatairePromises, ...randomLocatairePromises]);
  console.log(`✅ ${allLocataires.length} locataires créés`);

  // Établir les relations entre agences et locataires
  console.log('🔗 Établissement des relations agence-locataire...');
  const agence1 = createdAgences[0];
  const locataire1 = allLocataires[0];
  const locataire2 = allLocataires[1];

  await prisma.agence.update({
    where: { id: agence1.id },
    data: {
      locataires: {
        connect: [
          { id: locataire1.id },
          { id: locataire2.id }
        ]
      }
    }
  });
  console.log('✅ Relations agence-locataire établies');

  // Création des quittances
  console.log('📄 Création des quittances...');
  const quittancePromises = quittances.map((quittance) =>
    prisma.quittance.upsert({
      where: { id: quittance.id },
      update: quittance,
      create: quittance,
    })
  );
  await Promise.all(quittancePromises);
  console.log(`✅ ${quittances.length} quittances créées`);

  console.log('🎉 Seed terminé avec succès !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
  await prisma.$disconnect();
  });
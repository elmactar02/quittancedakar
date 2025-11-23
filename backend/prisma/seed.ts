import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import "dotenv/config";
import { v4 as uuidv4 } from 'uuid';
import { fakerLocataire } from '../fixtures';

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

  // --- 1. Création des Utilisateurs ---
  console.log('👥 Création des utilisateurs...');
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.upsert({
    where: { email: 'admin@quittancedakar.com' },
    update: {
      firstName: 'Admin',
      lastName: 'Quittance',
      phone: '+221700000001',
      password: hashedPassword,
      isActive: true,
    },
    create: {
      firstName: 'Admin',
      lastName: 'Quittance',
      email: 'admin@quittancedakar.com',
      phone: '+221700000001',
      password: hashedPassword,
      isActive: true,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'gerant@agence.com' },
    update: {
      firstName: 'Gérant',
      lastName: 'Agence',
      phone: '+221700000002',
      password: hashedPassword,
      isActive: true,
    },
    create: {
      firstName: 'Gérant',
      lastName: 'Agence',
      email: 'gerant@agence.com',
      phone: '+221700000002',
      password: hashedPassword,
      isActive: true,
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'locataire@test.com' },
    update: {
      firstName: 'Souley',
      lastName: 'Locataire',
      phone: '+221700000003',
      password: hashedPassword,
      isActive: true,
    },
    create: {
      firstName: 'Souley',
      lastName: 'Locataire',
      email: 'locataire@test.com',
      phone: '+221700000003',
      password: hashedPassword,
      isActive: true,
    },
  });

  const allUsers = [user1, user2, user3];
  console.log(`✅ ${allUsers.length} utilisateurs créés.`);

  // Création des agences
  console.log('🏢 Création des agences...');
  const agence1 = await prisma.agence.upsert({
    where: { email: 'contact@agence-centre.com' },
    update: {
      name: 'Agence Immobilière du Centre',
      adresse: '123 Avenue des Baobabs, Dakar',
    },
    create: {
      name: 'Agence Immobilière du Centre',
      email: 'contact@agence-centre.com',
      adresse: '123 Avenue des Baobabs, Dakar',
      role: 'agency',
    }
  });
  const createdAgences = [agence1];
  console.log(`✅ ${createdAgences.length} agences créées.`);

  // Création des employés d'agence
  console.log('👨‍💼 Création des employés d\'agence...');
  const employee1 = await prisma.agencyEmployee.upsert({
    where: { userId: user2.id },
    update: {
      agencyId: agence1.id,
    },
    create: {
      userId: user2.id,
      agencyId: agence1.id,
      position: 'Gérant',
      department: 'Direction',
      hireDate: new Date('2022-01-15'),
      salary: 750000,
      isManager: true,
    }
  });
  console.log(`✅ 1 employé créé.`);

  // Création des locataires fixes
  console.log('🏠 Création des locataires fixes...');
  const locataire1 = await prisma.locataire.upsert({
    where: { email: 'locataire@test.com' },
    update: {
      user: { connect: { id: user3.id } },
      name: `${user3.firstName} ${user3.lastName}`,
      adresse: 'Adresse par défaut',
      agence: { connect: { id: agence1.id } },
    },
    create: {
      user: { connect: { id: user3.id } },
      name: `${user3.firstName} ${user3.lastName}`,
      email: 'locataire@test.com',
      adresse: 'Adresse par défaut',
      role: 'tenant',
      agence: { connect: { id: agence1.id } },
    }
  });

  // Création des locataires aléatoires
  console.log('🎲 Création des locataires aléatoires...');
  const randomLocataires: any[] = [];
  for (let i = 0; i < 3; i++) {
    const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
    const loc = await fakerLocataire(randomUser.id);

    // Check if this user already has a locataire (avoid unique constraint and relation violation)
    let existingForUser = await prisma.locataire.findUnique({ where: { userId: randomUser.id } });
    if (existingForUser) {
      randomLocataires.push(existingForUser);
      continue;
    }

    // Also avoid creating duplicate by email
    const existingByEmail = await prisma.locataire.findUnique({ where: { email: loc.email } });
    if (existingByEmail) {
      randomLocataires.push(existingByEmail);
      continue;
    }

    // Create the locataire
    const created = await prisma.locataire.create({
      data: {
        id: loc.id,
        user: { connect: { id: loc.userId } },
        name: loc.name,
        email: loc.email,
        adresse: loc.adresse,
        role: loc.role || 'tenant',
        agence: { connect: { id: agence1.id } },
      }
    });
    randomLocataires.push(created);
  }

  const allLocataires = [locataire1, ...randomLocataires];
  console.log(`✅ ${allLocataires.length} locataires créés.`);

  // Création des quittances
  console.log('📄 Création des quittances...');
  const quittanceId = uuidv4();
  await prisma.quittance.upsert({
    where: { id: quittanceId },
    update: {
      locataire: { connect: { id: locataire1.id } },
      agence: { connect: { id: agence1.id } },
      amount: 75000,
      period: '2024-07',
      paymentDate: new Date('2024-07-01'),
      paid: true,
      adresse: 'Adresse quittance',
      link: null,
    },
    create: {
      id: quittanceId,
      locataire: { connect: { id: locataire1.id } },
      agence: { connect: { id: agence1.id } },
      amount: 75000,
      period: '2024-07',
      paymentDate: new Date('2024-07-01'),
      paid: true,
      adresse: 'Adresse quittance',
      link: null,
    }
  });
  console.log(`✅ 1 quittance créée.`);

  console.log('🎉 Seed terminé avec succès !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e.message);
    process.exit(1);
  })
  .finally(async () => {
  await prisma.$disconnect();
  });
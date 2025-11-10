// Import dynamique de faker pour éviter les conflits de modules

export const locataires = [
  {
    id: 'locataire-1',
    userId: 'user-1',
    name: 'Fatou Diop',
    email: 'fatou.diop@example.com',
    adresse: '123 Rue de la Forêt, Dakar',
    role: 'tenant',
  },
  {
    id: 'locataire-2',
    userId: 'user-2',
    name: 'Mamadou Ndiaye',
    email: 'mamadou.ndiaye@example.com',
    adresse: '456 Avenue Bourguiba, Dakar',
    role: 'tenant',
  },
  {
    id: 'locataire-3',
    userId: 'user-3',
    name: 'Awa Sarr',
    email: 'awa.sarr@example.com',
    adresse: '789 Boulevard du Centenaire, Dakar',
    role: 'tenant',
  },
];

// Fonction pour générer des locataires aléatoires
export const fakerLocataire = async (userId: string) => {
  const { faker } = await import('@faker-js/faker');
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  
  return {
    id: faker.string.uuid(),
    userId,
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }),
    adresse: faker.location.streetAddress({ useFullAddress: true }),
    role: 'tenant',
  };
};

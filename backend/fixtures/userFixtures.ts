// Utilisateurs fixes pour les tests
export const users = [
  {
    id: 'user-1',
    firstName: 'Admin',
    lastName: 'System',
    email: 'admin@quittancedakar.com',
    phone: '+221701234500',
    password: 'admin123',
    isActive: true,
  },
  {
    id: 'user-2',
    firstName: 'Manager',
    lastName: 'Agency',
    email: 'manager@dakar.sn',
    phone: '+221701234501',
    password: 'manager123',
    isActive: true,
  },
  {
    id: 'user-3',
    firstName: 'Agent',
    lastName: 'Location',
    email: 'agent@sunulocatif.sn',
    phone: '+221701234502',
    password: 'agent123',
    isActive: true,
  },
];

// Fonction pour générer des utilisateurs aléatoires
export const fakerUser = async () => {
  const { faker } = await import('@faker-js/faker');
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  
  return {
    user: {
      id: faker.string.uuid(),
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }),
      phone: faker.phone.number(),
      password: faker.internet.password(),
      isActive: faker.datatype.boolean(0.9), // 90% actifs
    }
  };
};

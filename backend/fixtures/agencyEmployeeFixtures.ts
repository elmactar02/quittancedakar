export const agencyEmployees = [
  {
    id: 'employee-1',
    userId: 'user-2', // Manager Agency
    agencyId: 'agence-1',
    position: 'Gestionnaire Principal',
    department: 'Location',
    hireDate: new Date('2022-01-15'),
    salary: 750000,
    isManager: true,
  },
  {
    id: 'employee-2',
    userId: 'user-3', // Agent Location
    agencyId: 'agence-2',
    position: 'Agent Commercial',
    department: 'Commercial',
    hireDate: new Date('2023-03-01'),
    salary: 450000,
    isManager: false,
  },
  {
    id: 'employee-3',
    userId: 'user-1', // Admin System
    agencyId: 'agence-1',
    position: 'Administrateur',
    department: 'IT',
    hireDate: new Date('2021-06-01'),
    salary: 800000,
    isManager: true,
  },
];

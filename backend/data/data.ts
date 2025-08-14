// src/data/mockData.ts

export type UserRole = 'agency' | 'tenant'

export interface User {
  id: string
  role: UserRole
  name: string
  email: string
  connectedAgencyIds?: string[] // for tenants
  adresse: string
}

export interface Receipt {
  id: string
  tenantId: string
  agencyId: string
  amount: number
  period: string
  paymentDate: string
  paid: boolean
  adresse: string
  link: string
}

export interface AccessRequest {
  id: string
  agencyId: string
  tenantId: string
  status: 'pending' | 'accepted' | 'rejected'
}

// 1. Agencies
export const agencies: User[] = [
  { id: 'a1', role: 'agency', name: 'Agence Dakar Plus', email: 'dakar@agence.sn',adresse: 'Paris' },
  { id: 'a2', role: 'agency', name: 'SunuLocatif', email: 'contact@sunulocatif.sn',adresse:'Massy' },
]

// 2. Tenants
export const tenants: User[] = [
  { id: 't1', role: 'tenant', name: 'Fatou Diop', email: 'fatou@example.com', connectedAgencyIds: ['a1'],adresse :'123,Rue de la forêt' },
  { id: 't2', role: 'tenant', name: 'Mamadou Ndiaye', email: 'mamadou@example.com', connectedAgencyIds: ['a1'],adresse:'Montmagny' },
  { id: 't3', role: 'tenant', name: 'Awa Sarr', email: 'awa@example.com', connectedAgencyIds: [],adresse:'Saint Denis' },
]

// 3. Receipts
export const receipts: Receipt[] = [
  {
    id: 'r1',
    tenantId: 't1',
    agencyId: 'a1',
    amount: 120000,
    period: '2025-07',
    paymentDate: '2025-07-05',
    paid: true,
    adresse: '123,Rue de la forêt',
    link: '',
  },
  {
    id: 'r2',
    tenantId: 't2',
    agencyId: 'a1',
    amount: 100000,
    period: '2025-07',
    paymentDate: '2025-07-07',
    paid: true,
    adresse:'Montmagny',
    link:''
  },
]

// 4. Access requests
export const accessRequests: AccessRequest[] = [
  {
    id: 'ar1',
    agencyId: 'a2',
    tenantId: 't3',
    status: 'pending',
  },
]

import { agencies, tenants, receipts, accessRequests } from './data'
import { v4 as uuidv4 } from 'uuid'

export function findAgencyByEmail(email:String){
  return agencies.find(t => t.email === email)
}
export function findTenantByEmail(email: string) {
  return tenants.find(t => t.email.toLowerCase() === email.toLowerCase())
}
export function findalltenants(id:string){
  return tenants.filter(t => (t.connectedAgencyIds?.includes(id))) ;
}
export function sendAccessRequest(agencyId: string, tenantId: string) {
  const existing = accessRequests.find(
    req => req.agencyId === agencyId && req.tenantId === tenantId && req.status === 'pending'
  )
  if (existing) return { error: 'Request already pending' }

  const newRequest = {
    id: uuidv4(),
    agencyId,
    tenantId,
    status: 'pending' as const,
  }
  accessRequests.push(newRequest)
  return newRequest
}

export function respondToAccessRequest(requestId: string, action: 'accept' | 'reject') {
  const req = accessRequests.find(r => r.id === requestId)
  if (!req) return { error: 'Request not found' }

  if (action === 'accept') {
    const tenant = tenants.find(t => t.id === req.tenantId)
    if (tenant && !tenant.connectedAgencyIds?.includes(req.agencyId)) {
      tenant.connectedAgencyIds = [...(tenant.connectedAgencyIds || []), req.agencyId]
    }
    req.status = 'accepted'
  } else {
    req.status = 'rejected'
  }

  return req
}

export function listReceiptsForTenant(tenantId: string) {
  return receipts.filter(r => (r.tenantId === tenantId))
}

export function createReceipt(
  tenantId: string,
  agencyId: string,
  amount: number,
  period: string,
  paymentDate: string,
  adresse: string,
  link:string,
) {
  const receipt = {
    id: uuidv4(),
    tenantId,
    agencyId,
    amount,
    period,
    paymentDate,
    adresse,
    paid: true,
    link
  }
  receipts.push(receipt)
  return receipt
}

export function agencyCanAccessTenant(agencyId: string, tenantId: string): boolean {
  const tenant = tenants.find(t => t.id === tenantId)
  return tenant?.connectedAgencyIds?.includes(agencyId) ?? false
}

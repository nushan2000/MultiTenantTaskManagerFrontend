export function getTenantId() {
  return localStorage.getItem('tenantId') || 'unknown';
}

export function getTenantName() {
  const tenantId = getTenantId();
  if (tenantId === '1') return 'Tenant One';
  if (tenantId === '2') return 'Tenant Two';
  return 'Unknown Tenant';
}

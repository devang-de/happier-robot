export interface StatusMeta {
  label: string
  color: string
  bg: string
}

export const statusMeta: Record<string, StatusMeta> = {
  // Lead stages
  new: { label: 'New', color: '#FFB867', bg: 'rgba(255, 165, 67, 0.15)' },
  unqualified: { label: 'Unqualified', color: '#D8D2C8', bg: 'rgba(255, 255, 255, 0.06)' },
  qualified: { label: 'Qualified', color: '#7BE0AE', bg: 'rgba(123, 224, 174, 0.14)' },
  negotiation: { label: 'Negotiation', color: '#F0CB82', bg: 'rgba(255, 179, 93, 0.14)' },
  followup: { label: 'Follow-up', color: '#9BB8ED', bg: 'rgba(155, 184, 237, 0.14)' },
  on_hold: { label: 'On Hold', color: '#D6A0D6', bg: 'rgba(214, 160, 214, 0.14)' },
  won: { label: 'Won', color: '#68D39B', bg: 'rgba(104, 211, 155, 0.18)' },
  lost: { label: 'Lost', color: '#FF8B85', bg: 'rgba(255, 139, 133, 0.14)' },

  // Lead states
  progressing: { label: 'Progressing', color: '#7BE0AE', bg: 'rgba(123, 224, 174, 0.14)' },
  at_risk: { label: 'At Risk', color: '#FFB867', bg: 'rgba(255, 165, 67, 0.15)' },
  blocked: { label: 'Blocked', color: '#FF8B85', bg: 'rgba(255, 139, 133, 0.14)' },
  closing: { label: 'Closing', color: '#68D39B', bg: 'rgba(104, 211, 155, 0.18)' },
  no_decision: { label: 'No Decision', color: '#D8D2C8', bg: 'rgba(255, 255, 255, 0.06)' },

  // HITL query statuses
  open: { label: 'Open', color: '#FFB867', bg: 'rgba(255, 165, 67, 0.15)' },
  answered: { label: 'Answered', color: '#68D39B', bg: 'rgba(104, 211, 155, 0.18)' },
  resolved_with_lead: { label: 'Resolved', color: '#7BE0AE', bg: 'rgba(123, 224, 174, 0.14)' },

  // Email types
  inbound: { label: 'Inbound', color: '#7BE0AE', bg: 'rgba(123, 224, 174, 0.14)' },
  outbound: { label: 'Outbound', color: '#FFB867', bg: 'rgba(255, 165, 67, 0.15)' },

  // Teams
  pricing: { label: 'Pricing', color: '#F0CB82', bg: 'rgba(255, 179, 93, 0.14)' },
  product: { label: 'Product', color: '#9BB8ED', bg: 'rgba(155, 184, 237, 0.14)' },
  legal: { label: 'Legal', color: '#D6A0D6', bg: 'rgba(214, 160, 214, 0.14)' },
  sales: { label: 'Sales', color: '#FFB867', bg: 'rgba(255, 165, 67, 0.15)' },
}

export function getStatusMeta(status: string): StatusMeta {
  return statusMeta[status] ?? { label: status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), color: '#D8D2C8', bg: 'rgba(255, 255, 255, 0.06)' }
}

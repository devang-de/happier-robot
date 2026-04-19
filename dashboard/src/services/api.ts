import {
  mockLeads,
  getAllCalls,
  getAllEmailThreads,
  getAllHITLQueries,
  getAllActivities,
  getLeadById,
  type Lead,
  type Call,
  type EmailThread,
  type HITLQuery,
  type Activity,
} from '../data/mock'

export type { Lead, Call, EmailThread, HITLQuery, Activity }

export async function getLeads(): Promise<Lead[]> {
  return mockLeads
}

export async function getLead(id: string): Promise<Lead | undefined> {
  return getLeadById(id)
}

export async function getCalls(): Promise<Call[]> {
  return getAllCalls()
}

export async function getEmailThreads(): Promise<EmailThread[]> {
  return getAllEmailThreads()
}

export async function getHITLQueries(): Promise<HITLQuery[]> {
  return getAllHITLQueries()
}

export async function getActivities(): Promise<Activity[]> {
  return getAllActivities()
}

// HappyRobot outbound call trigger
export async function triggerOutboundCall(phoneNumber: string, contactName: string, company: string, context: string) {
  const response = await fetch('https://platform.eu.happyrobot.ai/api/v2/workflows/019da484-32a4-7af6-9e70-86e9c2aad8eb/runs', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_HAPPYROBOT_API_KEY || ''}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      environment: 'production',
      payload: { phone_number: phoneNumber, contact_name: contactName, company: company, context: context },
    }),
  });
  return response.json();
}

// Cognee recall endpoint
const COGNEE_BASE = 'https://tenant-466bab74-626c-431d-b244-8fedc6fa0657.aws.cognee.ai'
const COGNEE_API_KEY = import.meta.env.VITE_COGNEE_API_KEY || ''
const COGNEE_TENANT_ID = '466bab74-626c-431d-b244-8fedc6fa0657'

export async function cogneeRecall(query: string) {
  const res = await fetch(`${COGNEE_BASE}/api/v1/recall`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': COGNEE_API_KEY,
      'X-Tenant-Id': COGNEE_TENANT_ID,
    },
    body: JSON.stringify({ query }),
  })
  if (!res.ok) throw new Error(`Cognee API error: ${res.status}`)
  return res.json()
}

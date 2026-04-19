import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getActivities, getLeads } from '../services/api'

const dotClass: Record<string, string> = {
  email_sent: 'email',
  email_received: 'email',
  call: 'voice',
  hitl_created: 'question',
  hitl_answered: 'question',
  stage_change: 'status',
  demo_scheduled: 'agent',
  deal_won: 'deal',
  deal_lost: 'deal',
}

const typeLabels: Record<string, string> = {
  call: 'Call',
  email_sent: 'Email Sent',
  email_received: 'Email Received',
  hitl_created: 'HITL Query Created',
  hitl_answered: 'HITL Query Answered',
  stage_change: 'Stage Change',
  demo_scheduled: 'Demo Scheduled',
  deal_won: 'Deal Won',
  deal_lost: 'Deal Lost',
}

export default function AgentActivity() {
  const navigate = useNavigate()
  const { data: activities = [] } = useQuery({ queryKey: ['activities'], queryFn: getActivities })
  const { data: leads = [] } = useQuery({ queryKey: ['leads'], queryFn: getLeads })
  const [typeFilter, setTypeFilter] = useState('')

  const types = [...new Set(activities.map((a) => a.type))]

  const filtered = activities.filter((a) => {
    if (typeFilter && a.type !== typeFilter) return false
    return true
  })

  return (
    <div style={{ maxWidth: 700 }} className="fade-up">
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="apex-select"
        >
          <option value="">All Types</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {typeLabels[t] ?? t}
            </option>
          ))}
        </select>
        <div style={{ marginLeft: 'auto', fontSize: '0.82rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
          {filtered.length} activit{filtered.length !== 1 ? 'ies' : 'y'}
        </div>
      </div>

      <div className="timeline">
        {filtered.map((a) => {
          const cls = dotClass[a.type] ?? 'agent'
          const lead = leads.find(l => l.id === a.lead_id)
          return (
            <div key={a.id} className="timeline-item">
              <div className={`timeline-dot ${cls}`} />
              <div
                className="card hover-lift"
                style={{ padding: 18, borderRadius: 20, cursor: 'pointer' }}
                onClick={() => navigate(`/leads/${a.lead_id}`)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {typeLabels[a.type] ?? a.type}
                  </span>
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '0.72rem', color: 'var(--text-faint)',
                  }}>
                    {a.timestamp}
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--apex-blue)', fontWeight: 600 }}>
                    {lead?.company_name ?? a.lead_id}
                  </span>{' '}
                  -- {a.summary}
                </div>
                <span className="badge" style={{
                  marginTop: 10, display: 'inline-block',
                  color: 'var(--text-faint)', background: 'var(--surface-soft)',
                  fontSize: '0.68rem',
                }}>
                  {lead?.contact_name ?? ''}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

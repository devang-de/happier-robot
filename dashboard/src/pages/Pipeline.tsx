import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getLeads } from '../services/api'
import StatusBadge from '../components/StatusBadge'

const stages = [
  { key: 'new', label: 'New', color: '#FFB867' },
  { key: 'unqualified', label: 'Unqualified', color: '#D8D2C8' },
  { key: 'qualified', label: 'Qualified', color: '#7BE0AE' },
  { key: 'negotiation', label: 'Negotiation', color: '#F0CB82' },
  { key: 'followup', label: 'Follow-up', color: '#9BB8ED' },
  { key: 'on_hold', label: 'On Hold', color: '#D6A0D6' },
  { key: 'won', label: 'Won', color: '#68D39B' },
  { key: 'lost', label: 'Lost', color: '#FF8B85' },
]

export default function Pipeline() {
  const navigate = useNavigate()
  const { data: leads = [] } = useQuery({ queryKey: ['leads'], queryFn: getLeads })

  return (
    <div className="fade-up">
      <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 16 }}>
        {stages.map((stage) => {
          const stageLeads = leads.filter((l) => l.stage === stage.key)
          return (
            <div key={stage.key} className="kanban-column" style={{ borderTopColor: stage.color }}>
              <div className="kanban-header">
                <div className="dot" style={{ background: stage.color }} />
                <span className="label">{stage.label}</span>
                <span className="count">{stageLeads.length}</span>
              </div>
              <div>
                {stageLeads.map((lead) => {
                  const lastActivity = lead.activities[lead.activities.length - 1]
                  return (
                    <div
                      key={lead.id}
                      className="kanban-card"
                      onClick={() => navigate(`/leads/${lead.id}`)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {lead.company_name}
                        </span>
                        <StatusBadge status={lead.current_state} />
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                        {lead.contact_name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-faint)', marginBottom: 10 }}>
                        {lead.role}
                      </div>
                      {lastActivity && (
                        <div style={{
                          fontSize: '0.72rem', color: 'var(--text-faint)',
                          marginBottom: 10,
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          Last: {lastActivity.summary.slice(0, 60)}...
                        </div>
                      )}
                      {/* Engagement bar */}
                      <div className="engagement-bar" style={{ marginBottom: 8 }}>
                        <div
                          className="fill"
                          style={{ width: `${lead.engagement_score * 10}%` }}
                        />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{
                          fontSize: '0.72rem', color: 'var(--text-faint)',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          maxWidth: '60%',
                        }}>
                          Next: {lead.next_action}
                        </span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--apex-blue)' }}>
                          EUR {lead.deal_value.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )
                })}
                {stageLeads.length === 0 && (
                  <div style={{
                    textAlign: 'center', padding: '32px 0',
                    fontSize: '0.78rem', color: 'var(--text-faint)',
                  }}>
                    No leads
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

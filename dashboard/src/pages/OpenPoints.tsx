import { useState, Fragment } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getHITLQueries, getLeads } from '../services/api'
import StatusBadge from '../components/StatusBadge'
import { ChevronRight } from 'lucide-react'

export default function HITLQueries() {
  const navigate = useNavigate()
  const { data: queries = [] } = useQuery({ queryKey: ['hitl'], queryFn: getHITLQueries })
  const { data: leads = [] } = useQuery({ queryKey: ['leads'], queryFn: getLeads })
  const [statusFilter, setStatusFilter] = useState('')
  const [teamFilter, setTeamFilter] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const enriched = queries.map(q => {
    const lead = leads.find(l => l.id === q.lead_id)
    return { ...q, leadName: lead?.contact_name ?? '', company: lead?.company_name ?? '' }
  })

  const filtered = enriched.filter((q) => {
    if (statusFilter && q.status !== statusFilter) return false
    if (teamFilter && q.team !== teamFilter) return false
    return true
  }).sort((a, b) => new Date(b.asked_at).getTime() - new Date(a.asked_at).getTime())

  const teams = [...new Set(queries.map((q) => q.team))]

  return (
    <div style={{ maxWidth: 1100 }} className="fade-up">
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="apex-select"
        >
          <option value="">All Statuses</option>
          <option value="open">Open</option>
          <option value="answered">Answered</option>
          <option value="resolved_with_lead">Resolved with Lead</option>
        </select>
        <select
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
          className="apex-select"
        >
          <option value="">All Teams</option>
          {teams.map((t) => (
            <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
          ))}
        </select>
        <div style={{ marginLeft: 'auto', fontSize: '0.82rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
          {filtered.length} quer{filtered.length !== 1 ? 'ies' : 'y'}
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="apex-table">
          <thead>
            <tr>
              <th style={{ width: 32 }} />
              <th>Question</th>
              <th>Team</th>
              <th>Status</th>
              <th>Lead</th>
              <th>Asked</th>
              <th>Answered</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(q => {
              const isExpanded = expandedId === q.id
              return (
                <Fragment key={q.id}>
                  <tr
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td style={{ paddingLeft: 14 }}>
                      <ChevronRight
                        size={14}
                        style={{
                          color: 'var(--text-faint)',
                          transition: 'transform 0.2s',
                          transform: isExpanded ? 'rotate(90deg)' : 'none',
                        }}
                      />
                    </td>
                    <td style={{ maxWidth: 320, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {q.question}
                    </td>
                    <td><StatusBadge status={q.team} /></td>
                    <td><StatusBadge status={q.status} /></td>
                    <td>
                      <span
                        style={{ color: 'var(--apex-blue)', fontWeight: 600, cursor: 'pointer' }}
                        onClick={(e) => { e.stopPropagation(); navigate(`/leads/${q.lead_id}`) }}
                      >
                        {q.leadName}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.82rem' }}>{q.asked_at}</td>
                    <td>
                      <span style={{ color: q.answered_at ? 'var(--text-secondary)' : 'var(--text-faint)', fontSize: '0.82rem' }}>
                        {q.answered_at ?? '--'}
                      </span>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr key={`${q.id}-expand`}>
                      <td colSpan={7} style={{ padding: 0 }}>
                        <div style={{
                          padding: '20px 24px',
                          background: 'var(--surface-soft)',
                          borderBottom: '1px solid var(--border-light)',
                        }}>
                          <div style={{ marginBottom: 14 }}>
                            <span className="mono-label" style={{ display: 'block', marginBottom: 8 }}>Full Question</span>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                              {q.question}
                            </p>
                          </div>
                          {q.answer && (
                            <div style={{
                              padding: '14px 18px', borderRadius: 14,
                              background: 'rgba(104, 211, 155, 0.08)',
                              border: '1px solid rgba(104, 211, 155, 0.15)',
                            }}>
                              <span className="mono-label" style={{ display: 'block', marginBottom: 8, color: 'var(--apex-green)' }}>
                                Answer
                              </span>
                              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                {q.answer}
                              </p>
                            </div>
                          )}
                          {q.slack_thread_id && (
                            <div style={{ marginTop: 10, fontSize: '0.75rem', color: 'var(--text-faint)' }}>
                              Slack: #{q.slack_thread_id}
                            </div>
                          )}
                          <div style={{ marginTop: 10 }}>
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                              Company: {q.company}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

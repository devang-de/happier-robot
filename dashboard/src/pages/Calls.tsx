import { useState, Fragment } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getCalls, getLeads } from '../services/api'
import StatusBadge from '../components/StatusBadge'
import { ChevronRight } from 'lucide-react'

export default function Calls() {
  const navigate = useNavigate()
  const { data: calls = [] } = useQuery({ queryKey: ['calls'], queryFn: getCalls })
  const { data: leads = [] } = useQuery({ queryKey: ['leads'], queryFn: getLeads })
  const [stageFilter, setStageFilter] = useState('')
  const [outcomeFilter, setOutcomeFilter] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const enrichedCalls = calls.map(c => {
    const lead = leads.find(l => l.id === c.lead_id)
    return { ...c, leadName: lead?.contact_name ?? '', company: lead?.company_name ?? '', stage: lead?.stage ?? '' }
  })

  const filtered = enrichedCalls.filter((c) => {
    if (stageFilter && c.stage !== stageFilter) return false
    if (outcomeFilter && !c.outcome.toLowerCase().includes(outcomeFilter.toLowerCase())) return false
    return true
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div style={{ maxWidth: 1100 }} className="fade-up">
      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          className="apex-select"
        >
          <option value="">All Stages</option>
          <option value="new">New</option>
          <option value="qualified">Qualified</option>
          <option value="negotiation">Negotiation</option>
          <option value="followup">Follow-up</option>
          <option value="on_hold">On Hold</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
        <input
          type="text"
          placeholder="Filter by outcome..."
          value={outcomeFilter}
          onChange={(e) => setOutcomeFilter(e.target.value)}
          className="apex-input"
          style={{ width: 220 }}
        />
        <div style={{ marginLeft: 'auto', fontSize: '0.82rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
          {filtered.length} call{filtered.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="apex-table">
          <thead>
            <tr>
              <th style={{ width: 32 }} />
              <th>Date</th>
              <th>Lead</th>
              <th>Company</th>
              <th>Duration</th>
              <th>Stage</th>
              <th>Outcome</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(call => {
              const isExpanded = expandedId === call.id
              return (
                <Fragment key={call.id}>
                  <tr
                    onClick={() => setExpandedId(isExpanded ? null : call.id)}
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
                    <td>{call.date}</td>
                    <td>
                      <span
                        style={{ color: 'var(--apex-blue)', fontWeight: 600, cursor: 'pointer' }}
                        onClick={(e) => { e.stopPropagation(); navigate(`/leads/${call.lead_id}`) }}
                      >
                        {call.leadName}
                      </span>
                    </td>
                    <td>{call.company}</td>
                    <td>{call.duration}</td>
                    <td><StatusBadge status={call.stage} /></td>
                    <td>{call.outcome}</td>
                  </tr>
                  {isExpanded && (
                    <tr key={`${call.id}-expand`}>
                      <td colSpan={7} style={{ padding: 0 }}>
                        <div style={{
                          padding: '20px 24px',
                          background: 'var(--surface-soft)',
                          borderBottom: '1px solid var(--border-light)',
                        }}>
                          <span className="mono-label" style={{ display: 'block', marginBottom: 10 }}>Transcript</span>
                          <div style={{
                            maxHeight: 400,
                            overflowY: 'auto',
                            paddingRight: 12,
                          }}>
                            <pre style={{
                              fontSize: '0.85rem', color: 'var(--text-secondary)',
                              whiteSpace: 'pre-wrap', fontFamily: "'Manrope', sans-serif",
                              lineHeight: 1.7,
                            }}>
                              {call.transcript}
                            </pre>
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

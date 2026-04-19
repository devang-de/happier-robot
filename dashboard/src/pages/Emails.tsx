import { useState, Fragment } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getEmailThreads, getLeads } from '../services/api'
import StatusBadge from '../components/StatusBadge'
import { ChevronRight } from 'lucide-react'

export default function Emails() {
  const navigate = useNavigate()
  const { data: threads = [] } = useQuery({ queryKey: ['emailThreads'], queryFn: getEmailThreads })
  const { data: leads = [] } = useQuery({ queryKey: ['leads'], queryFn: getLeads })
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const enrichedThreads = threads.map(t => {
    const lead = leads.find(l => l.id === t.lead_id)
    const lastMsg = t.messages[t.messages.length - 1]
    return {
      ...t,
      leadName: lead?.contact_name ?? '',
      company: lead?.company_name ?? '',
      stage: lead?.stage ?? '',
      lastDate: lastMsg?.timestamp ?? '',
      msgCount: t.messages.length,
      lastDirection: lastMsg?.direction ?? 'outbound',
    }
  }).sort((a, b) => new Date(b.lastDate).getTime() - new Date(a.lastDate).getTime())

  return (
    <div style={{ maxWidth: 1100 }} className="fade-up">
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
          {enrichedThreads.length} thread{enrichedThreads.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="apex-table">
          <thead>
            <tr>
              <th style={{ width: 32 }} />
              <th>Last Activity</th>
              <th>Lead</th>
              <th>Company</th>
              <th>Subject</th>
              <th>Messages</th>
              <th>Stage</th>
            </tr>
          </thead>
          <tbody>
            {enrichedThreads.map(thread => {
              const isExpanded = expandedId === thread.id
              return (
                <Fragment key={thread.id}>
                  <tr
                    onClick={() => setExpandedId(isExpanded ? null : thread.id)}
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
                    <td style={{ fontSize: '0.82rem' }}>{thread.lastDate}</td>
                    <td>
                      <span
                        style={{ color: 'var(--apex-blue)', fontWeight: 600, cursor: 'pointer' }}
                        onClick={(e) => { e.stopPropagation(); navigate(`/leads/${thread.lead_id}`) }}
                      >
                        {thread.leadName}
                      </span>
                    </td>
                    <td>{thread.company}</td>
                    <td style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {thread.subject}
                    </td>
                    <td>
                      <span style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: '0.8rem',
                      }}>
                        {thread.msgCount}
                      </span>
                    </td>
                    <td><StatusBadge status={thread.stage} /></td>
                  </tr>
                  {isExpanded && (
                    <tr key={`${thread.id}-expand`}>
                      <td colSpan={7} style={{ padding: 0 }}>
                        <div style={{
                          padding: '20px 24px',
                          background: 'var(--surface-soft)',
                          borderBottom: '1px solid var(--border-light)',
                          maxHeight: 500,
                          overflowY: 'auto',
                        }}>
                          <span className="mono-label" style={{ display: 'block', marginBottom: 16 }}>
                            Thread: {thread.subject}
                          </span>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {thread.messages.map(msg => {
                              const isOutbound = msg.direction === 'outbound'
                              return (
                                <div
                                  key={msg.id}
                                  style={{
                                    alignSelf: isOutbound ? 'flex-end' : 'flex-start',
                                    maxWidth: '80%',
                                    padding: '14px 18px',
                                    borderRadius: isOutbound ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                    background: isOutbound
                                      ? 'rgba(255, 152, 47, 0.1)'
                                      : 'rgba(255, 255, 255, 0.04)',
                                    border: `1px solid ${isOutbound ? 'rgba(255, 152, 47, 0.2)' : 'var(--border)'}`,
                                  }}
                                >
                                  <div style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    marginBottom: 8, gap: 16,
                                  }}>
                                    <span style={{
                                      fontSize: '0.75rem', fontWeight: 600,
                                      color: isOutbound ? 'var(--apex-blue)' : 'var(--text-muted)',
                                    }}>
                                      {isOutbound ? 'Agent' : msg.from.split('@')[0]}
                                    </span>
                                    <span style={{
                                      fontFamily: "'IBM Plex Mono', monospace",
                                      fontSize: '0.68rem', color: 'var(--text-faint)',
                                    }}>
                                      {msg.timestamp}
                                    </span>
                                  </div>
                                  <pre style={{
                                    fontSize: '0.82rem', color: 'var(--text-secondary)',
                                    whiteSpace: 'pre-wrap', fontFamily: "'Manrope', sans-serif",
                                    lineHeight: 1.6, margin: 0,
                                  }}>
                                    {msg.body}
                                  </pre>
                                </div>
                              )
                            })}
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

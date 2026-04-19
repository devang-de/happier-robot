import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Mail, Phone, Building2, Clock, Target, Briefcase, User } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import StatusBadge from '../components/StatusBadge'
import { getLead, triggerOutboundCall } from '../services/api'

const typeLabels: Record<string, string> = {
  call: 'Call',
  email_sent: 'Email Sent',
  email_received: 'Email Received',
  hitl_created: 'HITL Query Created',
  hitl_answered: 'HITL Answer Received',
  stage_change: 'Stage Change',
  demo_scheduled: 'Demo Scheduled',
  deal_won: 'Deal Won',
  deal_lost: 'Deal Lost',
}

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

function BANTBar({ label, value }: { label: string; value: string }) {
  // Derive a numeric score from the BANT text for the bar
  const score = value.toLowerCase().includes('approved') || value.toLowerCase().includes('decision maker') || value.toLowerCase().includes('started')
    ? 90
    : value.toLowerCase().includes('allocated') || value.toLowerCase().includes('sign-off') || value.toLowerCase().includes('automate')
    ? 70
    : value.toLowerCase().includes('not') || value.toLowerCase().includes('unknown') || value.toLowerCase().includes('no ')
    ? 20
    : 50
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>{label}</span>
      </div>
      <div className="engagement-bar" style={{ marginBottom: 4 }}>
        <div className="fill" style={{ width: `${score}%` }} />
      </div>
      <span style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>{value}</span>
    </div>
  )
}

export default function LeadDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: lead } = useQuery({ queryKey: ['lead', id], queryFn: () => getLead(id!) })

  if (!lead) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, color: 'var(--text-faint)' }}>
        Loading...
      </div>
    )
  }

  const daysUntilAction = Math.max(
    0,
    Math.ceil((new Date(lead.next_action_at).getTime() - Date.now()) / 86400000)
  )

  // Merge all interactions into one timeline, sorted chronologically
  const timeline = [...lead.activities].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  )

  return (
    <div style={{ maxWidth: 1000 }} className="fade-up">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="action-btn"
        style={{ marginBottom: 20 }}
      >
        <ArrowLeft size={14} /> Back
      </button>

      {/* Profile Header */}
      <GlassCard style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'linear-gradient(135deg, #ffd29a, #ff7b17)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem', fontWeight: 800, color: '#231708',
            }}>
              {lead.contact_name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
                {lead.contact_name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                <Building2 size={14} /> {lead.company_name}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-faint)', fontSize: '0.8rem', marginTop: 2 }}>
                <Briefcase size={13} /> {lead.role}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <StatusBadge status={lead.stage} />
            <StatusBadge status={lead.current_state} />
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '1.1rem', fontWeight: 700, color: 'var(--apex-blue)',
              }}>
                EUR {lead.deal_value.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-faint)', marginTop: 2 }}>
                Confidence: {Math.round(lead.confidence * 100)}%
              </div>
            </div>
          </div>
        </div>
        {/* Engagement score bar */}
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Engagement Score</span>
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.85rem', fontWeight: 700,
              color: lead.engagement_score >= 7 ? 'var(--apex-green)' : lead.engagement_score >= 4 ? 'var(--apex-orange)' : 'var(--apex-red)',
            }}>
              {lead.engagement_score}/10
            </span>
          </div>
          <div className="engagement-bar">
            <div className="fill" style={{ width: `${lead.engagement_score * 10}%` }} />
          </div>
        </div>
      </GlassCard>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16 }}>
        {/* Left column */}
        <div>
          {/* BANT Analysis */}
          <GlassCard style={{ marginBottom: 16 }}>
            <span className="mono-label" style={{ display: 'block', marginBottom: 16 }}>BANT Assessment</span>
            <BANTBar label="Budget" value={lead.bant.budget} />
            <BANTBar label="Authority" value={lead.bant.authority} />
            <BANTBar label="Need" value={lead.bant.need} />
            <BANTBar label="Timeline" value={lead.bant.timeline} />
          </GlassCard>

          {/* Full Interaction Timeline */}
          <GlassCard>
            <span className="mono-label" style={{ display: 'block', marginBottom: 16 }}>
              Interaction Timeline ({timeline.length} events)
            </span>
            {timeline.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-faint)' }}>No interactions recorded.</p>
            ) : (
              <div className="timeline">
                {timeline.map((a) => {
                  const cls = dotClass[a.type] ?? 'agent'
                  return (
                    <div key={a.id} className="timeline-item">
                      <div className={`timeline-dot ${cls}`} />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            {typeLabels[a.type] ?? a.type}
                          </span>
                          <span style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: '0.7rem', color: 'var(--text-faint)',
                          }}>
                            {a.timestamp}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                          {a.summary}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </GlassCard>
        </div>

        {/* Right sidebar */}
        <div>
          {/* Contact Info */}
          <GlassCard style={{ marginBottom: 16 }}>
            <span className="mono-label" style={{ display: 'block', marginBottom: 12 }}>Contact</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <User size={14} color="var(--text-faint)" />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{lead.contact_name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Mail size={14} color="var(--text-faint)" />
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{lead.contact_email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Phone size={14} color="var(--text-faint)" />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{lead.contact_phone}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem', padding: '8px 0' }}>
                <Mail size={13} /> Email
              </button>
              <button
                className="btn-ghost"
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem', padding: '8px 0' }}
                onClick={async () => {
                  alert(`Calling ${lead.contact_name}...`);
                  try {
                    await triggerOutboundCall(
                      lead.contact_phone,
                      lead.contact_name,
                      lead.company_name,
                      `Follow-up negotiation call. Stage: ${lead.stage}. Deal value: EUR ${lead.deal_value.toLocaleString()}.`
                    );
                  } catch (err) {
                    console.error('Failed to trigger outbound call:', err);
                  }
                }}
              >
                <Phone size={13} /> Call
              </button>
            </div>
          </GlassCard>

          {/* Next Action */}
          <GlassCard style={{ marginBottom: 16 }}>
            <span className="mono-label" style={{ display: 'block', marginBottom: 12 }}>Next Action</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Clock size={14} color="var(--apex-blue)" />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{lead.next_action}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Target size={14} color="var(--text-faint)" />
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{lead.next_action_at}</span>
              <span style={{
                marginLeft: 'auto',
                fontSize: '0.78rem', fontWeight: 700,
                color: daysUntilAction <= 1 ? 'var(--apex-red)' : 'var(--apex-green)',
              }}>
                {daysUntilAction === 0 ? 'Today' : `${daysUntilAction}d`}
              </span>
            </div>
          </GlassCard>

          {/* Channel Stats */}
          <GlassCard style={{ marginBottom: 16 }}>
            <span className="mono-label" style={{ display: 'block', marginBottom: 12 }}>Channel Stats</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Calls</span>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)',
                }}>
                  {lead.calls.length}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Email Threads</span>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)',
                }}>
                  {lead.emails.length}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>HITL Queries</span>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)',
                }}>
                  {lead.hitl_queries.length}
                </span>
              </div>
            </div>
          </GlassCard>

          {/* HITL Queries */}
          <GlassCard>
            <span className="mono-label" style={{ display: 'block', marginBottom: 12 }}>HITL Queries</span>
            {lead.hitl_queries.length === 0 ? (
              <p style={{ fontSize: '0.82rem', color: 'var(--text-faint)' }}>No HITL queries.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {lead.hitl_queries.map((q) => (
                  <div key={q.id} style={{
                    padding: 12, borderRadius: 14,
                    background: 'var(--surface-soft)',
                    border: '1px solid var(--border-light)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                      <StatusBadge status={q.status} />
                      <StatusBadge status={q.team} />
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: 6 }}>
                      {q.question.length > 120 ? q.question.slice(0, 120) + '...' : q.question}
                    </p>
                    {q.answer && (
                      <div style={{
                        padding: '8px 10px', borderRadius: 10,
                        background: 'rgba(104, 211, 155, 0.06)',
                        border: '1px solid rgba(104, 211, 155, 0.1)',
                        marginTop: 6,
                      }}>
                        <p style={{ fontSize: '0.72rem', color: 'var(--apex-green)', lineHeight: 1.4 }}>
                          {q.answer.length > 100 ? q.answer.slice(0, 100) + '...' : q.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

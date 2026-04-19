import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Users, Clock, Trophy, CircleAlert, Mail, Phone, ArrowRight } from 'lucide-react'
import KPICard from '../components/KPICard'
import GlassCard from '../components/GlassCard'
import StatusBadge from '../components/StatusBadge'
import { PipelineBarChart, StageDonutChart } from '../components/Charts'
import { getLeads, getActivities, getHITLQueries } from '../services/api'
import { mockPipelineData, mockStageData } from '../data/mock'
import { useNavigate } from 'react-router-dom'

const actionIcons: Record<string, typeof Mail> = {
  call: Phone,
  email_sent: Mail,
  email_received: Mail,
  hitl_created: CircleAlert,
  hitl_answered: CircleAlert,
  deal_won: Trophy,
  deal_lost: CircleAlert,
  stage_change: ArrowRight,
  demo_scheduled: Clock,
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { data: leads = [] } = useQuery({ queryKey: ['leads'], queryFn: getLeads })
  const { data: activities = [] } = useQuery({ queryKey: ['activities'], queryFn: getActivities })
  const { data: hitlQueries = [] } = useQuery({ queryKey: ['hitl'], queryFn: getHITLQueries })
  const [stageFilter, setStageFilter] = useState<string | null>(null)

  const activeLeads = leads.filter((l) => !['won', 'lost'].includes(l.stage)).length
  const pendingFollowUps = leads.filter(
    (l) => new Date(l.next_action_at) <= new Date(Date.now() + 2 * 86400000)
  ).length
  const wonDeals = leads.filter((l) => l.stage === 'won').length
  const openQueries = hitlQueries.filter(q => q.status === 'open').length

  const recentActivities = activities.slice(0, 8)

  const stageCounts = mockStageData
  const totalLeads = stageCounts.reduce((s, c) => s + c.value, 0)

  // Map stage labels back to stage keys for filtering
  const stageLabelToKey: Record<string, string> = {
    'New': 'new', 'Unqualified': 'unqualified', 'Qualified': 'qualified',
    'Negotiation': 'negotiation', 'Follow-up': 'followup', 'On Hold': 'on_hold',
    'Won': 'won', 'Lost': 'lost',
  }

  const filteredLeads = stageFilter
    ? leads.filter(l => l.stage === stageFilter)
    : leads.filter(l => !['won', 'lost'].includes(l.stage))

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div style={{ maxWidth: 1100 }}>
      {/* Greeting */}
      <div className="fade-up" style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: 4 }}>
          {greeting}, Devang
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Here is your pipeline summary for today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <KPICard label="Active Leads" value={activeLeads} delta={2} icon={Users} delay={1} />
        <KPICard label="Pending Follow-ups" value={pendingFollowUps} delta={-1} icon={Clock} delay={2} />
        <KPICard label="Won Deals" value={wonDeals} delta={1} icon={Trophy} delay={3} />
        <KPICard label="Open HITL Queries" value={openQueries} delta={1} icon={CircleAlert} delay={4} />
      </div>

      {/* Status Distribution Bar — clickable filter */}
      <GlassCard className="fade-up fade-up-5" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <span className="mono-label">Pipeline Distribution</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {stageFilter && (
              <button
                onClick={() => setStageFilter(null)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '0.75rem', color: 'var(--apex-blue)', fontWeight: 600,
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                Clear filter
              </button>
            )}
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{totalLeads} total leads</span>
          </div>
        </div>
        <div className="status-bar" style={{ cursor: 'pointer' }}>
          {stageCounts.map((s) => {
            const stageKey = stageLabelToKey[s.name] || s.name.toLowerCase()
            const isActive = stageFilter === stageKey
            return (
              <div
                key={s.name}
                className="segment"
                onClick={() => setStageFilter(stageFilter === stageKey ? null : stageKey)}
                style={{
                  width: `${(s.value / totalLeads) * 100}%`,
                  background: s.color,
                  opacity: stageFilter && !isActive ? 0.3 : 1,
                  outline: isActive ? `2px solid ${s.color}` : 'none',
                  outlineOffset: 2,
                  transition: 'opacity 0.2s, outline 0.2s',
                }}
              />
            )
          })}
        </div>
        <div style={{ display: 'flex', gap: 18, marginTop: 12, flexWrap: 'wrap' }}>
          {stageCounts.map((s) => {
            const stageKey = stageLabelToKey[s.name] || s.name.toLowerCase()
            const isActive = stageFilter === stageKey
            return (
              <div
                key={s.name}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
                  opacity: stageFilter && !isActive ? 0.5 : 1,
                  transition: 'opacity 0.2s',
                }}
                onClick={() => setStageFilter(stageFilter === stageKey ? null : stageKey)}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: isActive ? 700 : 400 }}>
                  {s.name} ({s.value})
                </span>
              </div>
            )
          })}
        </div>
      </GlassCard>

      {/* Charts + Activity Feed */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 320px', gap: 16, marginBottom: 24 }}>
        <GlassCard className="fade-up fade-up-5">
          <span className="mono-label" style={{ display: 'block', marginBottom: 16 }}>Pipeline Value</span>
          <PipelineBarChart data={mockPipelineData} />
        </GlassCard>

        <GlassCard className="fade-up fade-up-6">
          <span className="mono-label" style={{ display: 'block', marginBottom: 16 }}>Leads by Stage</span>
          <StageDonutChart data={mockStageData} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 8, justifyContent: 'center' }}>
            {mockStageData.map((s) => (
              <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: s.color }} />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>{s.name}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Activity Feed Sidebar */}
        <GlassCard className="fade-up fade-up-6" style={{ padding: '20px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span className="mono-label">Activity</span>
            <button
              onClick={() => navigate('/activity')}
              className="action-btn"
              style={{ padding: '4px 10px', fontSize: '0.72rem' }}
            >
              View all <ArrowRight size={10} />
            </button>
          </div>
          <div className="activity-feed">
            {recentActivities.map((a) => {
              const Icon = actionIcons[a.type] ?? CircleAlert
              const leadData = leads.find(l => l.id === a.lead_id)
              return (
                <div
                  key={a.id}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 8px',
                    borderRadius: 12, cursor: 'pointer', transition: 'background 0.15s',
                  }}
                  onClick={() => navigate(`/leads/${a.lead_id}`)}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-soft)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <div style={{
                    padding: 8, borderRadius: 10,
                    background: 'var(--apex-blue-light)', flexShrink: 0,
                  }}>
                    <Icon size={13} color="var(--apex-blue)" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      {a.type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </div>
                    <div style={{
                      fontSize: '0.72rem', color: 'var(--text-faint)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {leadData?.company_name ?? a.lead_id}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </GlassCard>
      </div>

      {/* Worklist Grid */}
      <GlassCard className="fade-up fade-up-6">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <span className="mono-label">
            {stageFilter
              ? `Worklist — ${stageFilter.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}`
              : 'Worklist'}
          </span>
          <button onClick={() => navigate('/leads')} className="action-btn" style={{ fontSize: '0.78rem' }}>
            View Leadbook <ArrowRight size={12} />
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {filteredLeads.slice(0, 6).map((lead) => (
            <div
              key={lead.id}
              className="hover-lift"
              onClick={() => navigate(`/leads/${lead.id}`)}
              style={{
                padding: 16, borderRadius: 18,
                background: 'var(--surface-soft)',
                border: '1px solid var(--border-light)',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {lead.company_name}
                </span>
                <StatusBadge status={lead.stage} />
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4 }}>{lead.contact_name}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-faint)', marginBottom: 8 }}>{lead.role}</div>
              <div className="engagement-bar" style={{ marginBottom: 8 }}>
                <div className="fill" style={{ width: `${lead.engagement_score * 10}%` }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>
                  Next: {lead.next_action}
                </span>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--apex-blue)' }}>
                  EUR {lead.deal_value.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
        {filteredLeads.length === 0 && (
          <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-faint)', fontSize: '0.85rem' }}>
            No leads in this stage.
          </div>
        )}
      </GlassCard>
    </div>
  )
}

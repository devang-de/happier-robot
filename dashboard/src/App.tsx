import { useState } from 'react'
import { Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Calls from './pages/Calls'
import Emails from './pages/Emails'
import Pipeline from './pages/Pipeline'
import HITLQueries from './pages/OpenPoints'
import LeadDetail from './pages/LeadDetail'
import Settings from './pages/Settings'
import AgentBrain from './pages/AgentBrain'
import AgentActivity from './pages/AgentActivity'
import NewLead from './pages/NewLead'

const navItems = [
  {
    to: '/',
    label: 'Dashboard',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="2" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="2" y="11" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="11" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    to: '/leads',
    label: 'Leadbook',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M14 2H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 6h6M7 10h6M7 14h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: '/calls',
    label: 'Calls',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M5.5 3.5c-.7 0-1.3.3-1.7.8C2.4 6.2 3.8 10.5 6.7 13.3c2.8 2.9 7.1 4.3 9 2.9.5-.4.8-1 .8-1.7l-.5-1.8c-.2-.5-.7-.8-1.2-.7l-2 .5c-.3.1-.7 0-.9-.3L9.7 9.8c-.2-.3-.2-.6-.1-.9l.8-2c.2-.5-.1-1-.6-1.2L8 5.3 5.5 3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    to: '/emails',
    label: 'Emails',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 6l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: '/hitl',
    label: 'HITL Queries',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6v5M10 13.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: '/activity',
    label: 'Activity',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 10h3l2-6 4 12 2-6h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    to: '/brain',
    label: 'Agent Brain',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="4" cy="5" r="2" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="16" cy="5" r="2" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="4" cy="15" r="2" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="16" cy="15" r="2" stroke="currentColor" strokeWidth="1.2" />
        <line x1="7.5" y1="8.5" x2="5.5" y2="6.5" stroke="currentColor" strokeWidth="1.2" />
        <line x1="12.5" y1="8.5" x2="14.5" y2="6.5" stroke="currentColor" strokeWidth="1.2" />
        <line x1="7.5" y1="11.5" x2="5.5" y2="13.5" stroke="currentColor" strokeWidth="1.2" />
        <line x1="12.5" y1="11.5" x2="14.5" y2="13.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    to: '/settings',
    label: 'Settings',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M3.9 3.9l1.4 1.4M14.7 14.7l1.4 1.4M3.9 16.1l1.4-1.4M14.7 5.3l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

const favorites = [
  { name: 'Allianz', id: 'lead-1' },
  { name: 'BMW', id: 'lead-2' },
]

const pageMeta: Record<string, { kicker: string; title: string }> = {
  '/': { kicker: 'Overview', title: 'Dashboard' },
  '/leads': { kicker: 'Pipeline', title: 'Leadbook' },
  '/calls': { kicker: 'Communications', title: 'Calls' },
  '/emails': { kicker: 'Communications', title: 'Emails' },
  '/hitl': { kicker: 'Internal', title: 'HITL Queries' },
  '/activity': { kicker: 'Timeline', title: 'Agent Activity' },
  '/brain': { kicker: 'Knowledge', title: 'Agent Brain' },
  '/settings': { kicker: 'System', title: 'Settings' },
  '/leads/new': { kicker: 'Pipeline', title: 'New Lead' },
}

export default function App() {
  const [collapsed, setCollapsed] = useState(false)
  const [agentOn, setAgentOn] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  const basePath = '/' + (location.pathname.split('/')[1] ?? '')
  const fullPath = location.pathname
  const meta = pageMeta[fullPath] ?? pageMeta[basePath] ?? { kicker: '', title: 'Happier Robot' }

  return (
    <div style={{ padding: '26px 20px' }}>
      <div className="app-shell">
        {/* ── Sidebar ── */}
        <aside className={`sidebar${collapsed ? ' collapsed' : ''}`}>
          <div className="brand-lockup">
            {/* Orbit Mark Logo */}
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="18" cy="18" r="16" stroke="url(#orbit-grad)" strokeWidth="2" />
              <circle cx="18" cy="18" r="6" fill="url(#orbit-grad)" />
              <circle cx="18" cy="4" r="3" fill="#ff982f" />
              <defs>
                <linearGradient id="orbit-grad" x1="0" y1="0" x2="36" y2="36">
                  <stop stopColor="#ffd29a" />
                  <stop offset="1" stopColor="#ff7b17" />
                </linearGradient>
              </defs>
            </svg>
            <div className="brand-text">
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                Happier Robot
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-faint)', fontFamily: "'IBM Plex Mono', monospace" }}>
                AI Sales Agent
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="search-bar">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3" />
              <line x1="9.5" y1="9.5" x2="13" y2="13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span style={{ flex: 1 }}>Search...</span>
            <kbd style={{
              fontSize: '0.65rem',
              padding: '2px 6px',
              borderRadius: 6,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              fontFamily: "'IBM Plex Mono', monospace",
              color: 'var(--text-faint)',
            }}>
              Cmd+K
            </kbd>
          </div>

          {/* Nav */}
          <nav className="nav-section">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            ))}

            {/* Favorites */}
            <div className="favorites-section">
              <div className="favorites-label">Favorites</div>
              {favorites.map((fav) => (
                <NavLink
                  key={fav.id}
                  to={`/leads/${fav.id}`}
                  className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
                >
                  <span className="nav-icon">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <polygon points="7,1 8.8,5 13,5.5 9.9,8.3 10.7,13 7,10.8 3.3,13 4.1,8.3 1,5.5 5.2,5" stroke="currentColor" strokeWidth="1.2" fill="none" />
                    </svg>
                  </span>
                  <span className="nav-label">{fav.name}</span>
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="sidebar-footer">
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'linear-gradient(135deg, #ffd29a, #ff7b17)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.75rem', fontWeight: 800, color: '#231708', flexShrink: 0,
            }}>
              DD
            </div>
            <div className="footer-text">
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Devang D.</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-faint)' }}>devang@tum.ai</div>
            </div>
          </div>
        </aside>

        {/* ── Main ── */}
        <div className="main-content">
          <header className="main-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {/* Panel toggle */}
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="action-btn"
                title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                style={{ padding: '8px 10px' }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="1" y="2" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
                  <line x1="6.5" y1="2" x2="6.5" y2="16" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
              <div className="page-info">
                <span className="page-kicker">{meta.kicker}</span>
                <span className="page-title">{meta.title}</span>
              </div>
            </div>
            <div className="header-actions">
              <div className="agent-toggle" onClick={() => setAgentOn(!agentOn)}>
                <div className={agentOn ? 'pulse-dot' : 'dot off'} />
                <span>{agentOn ? 'Agent Active' : 'Agent Paused'}</span>
              </div>
              <button className="btn-primary" onClick={() => navigate('/leads/new')}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <line x1="7" y1="2" x2="7" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="2" y1="7" x2="12" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                New Lead
              </button>
            </div>
          </header>

          <div className="main-scroll">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/leads" element={<Pipeline />} />
              <Route path="/leads/new" element={<NewLead />} />
              <Route path="/leads/:id" element={<LeadDetail />} />
              <Route path="/calls" element={<Calls />} />
              <Route path="/emails" element={<Emails />} />
              <Route path="/hitl" element={<HITLQueries />} />
              <Route path="/activity" element={<AgentActivity />} />
              <Route path="/brain" element={<AgentBrain />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

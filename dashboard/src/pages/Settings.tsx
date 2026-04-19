import { useState } from 'react'
import GlassCard from '../components/GlassCard'
import { Database, Key, Bell, Globe, Cpu } from 'lucide-react'

function ToggleSwitch({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <div className={`toggle-switch${on ? ' on' : ''}`} onClick={onToggle}>
      <div className="toggle-knob" />
    </div>
  )
}

function EnvRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="env-row">
      <span className="env-label">{label}</span>
      <span className="env-value">{value}</span>
    </div>
  )
}

export default function Settings() {
  const [useMock, setUseMock] = useState(true)
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    'New lead assigned': true,
    'Deal stage changed': true,
    'Open point answered': true,
    'Overdue follow-up': true,
  })

  return (
    <div style={{ maxWidth: 680 }} className="fade-up">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Data Source */}
        <GlassCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ padding: 10, borderRadius: 12, background: 'var(--apex-blue-light)' }}>
              <Database size={18} color="var(--apex-blue)" />
            </div>
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>Data Source</span>
          </div>
          <div className="env-row">
            <span className="env-label">Use Mock Data</span>
            <ToggleSwitch on={useMock} onToggle={() => setUseMock(!useMock)} />
          </div>
          <div className="env-row" style={{ borderBottom: 'none' }}>
            <span className="env-label">API Base URL</span>
            <input
              type="text"
              defaultValue="https://platform.eu.happyrobot.ai/api/v2"
              className="apex-input"
              style={{ width: 320, textAlign: 'right' }}
            />
          </div>
        </GlassCard>

        {/* API Key */}
        <GlassCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ padding: 10, borderRadius: 12, background: 'var(--apex-blue-light)' }}>
              <Key size={18} color="var(--apex-blue)" />
            </div>
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>API Key</span>
          </div>
          <input
            type="password"
            defaultValue="••••••••••••••••••••••••"
            className="apex-input"
            style={{ width: '100%' }}
          />
        </GlassCard>

        {/* Cognee / Agent Brain */}
        <GlassCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ padding: 10, borderRadius: 12, background: 'var(--apex-blue-light)' }}>
              <Cpu size={18} color="var(--apex-blue)" />
            </div>
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>Agent Brain (Cognee)</span>
          </div>
          <EnvRow label="Tenant ID" value="466bab74-626c-431d-b244-8fedc6fa0657" />
          <EnvRow label="Endpoint" value="tenant-466bab74...aws.cognee.ai" />
        </GlassCard>

        {/* Environment */}
        <GlassCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ padding: 10, borderRadius: 12, background: 'var(--apex-blue-light)' }}>
              <Globe size={18} color="var(--apex-blue)" />
            </div>
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>Environment</span>
          </div>
          <EnvRow label="Platform" value="Happier Robot" />
          <EnvRow label="Version" value="2.0.0" />
          <EnvRow label="Region" value="EU (Frankfurt)" />
        </GlassCard>

        {/* Notifications */}
        <GlassCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ padding: 10, borderRadius: 12, background: 'var(--apex-blue-light)' }}>
              <Bell size={18} color="var(--apex-blue)" />
            </div>
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>Notifications</span>
          </div>
          {Object.entries(notifications).map(([label, on]) => (
            <div key={label} className="env-row">
              <span className="env-label">{label}</span>
              <ToggleSwitch
                on={on}
                onToggle={() => setNotifications((prev) => ({ ...prev, [label]: !prev[label] }))}
              />
            </div>
          ))}
        </GlassCard>
      </div>
    </div>
  )
}

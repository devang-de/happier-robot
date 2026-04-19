import type { LucideIcon } from 'lucide-react'

interface Props {
  label: string
  value: number | string
  delta: number
  icon: LucideIcon
  delay?: number
}

export default function KPICard({ label, value, delta, icon: Icon, delay = 0 }: Props) {
  const isPositive = delta >= 0
  return (
    <div className={`kpi-card hover-lift fade-up fade-up-${delay}`}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <p className="mono-label" style={{ marginBottom: 8 }}>{label}</p>
          <p style={{
            fontSize: '2.3rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1,
            letterSpacing: '-0.05em', fontVariantNumeric: 'tabular-nums',
          }}>
            {value}
          </p>
          <p style={{
            fontSize: '0.82rem',
            fontWeight: 600,
            marginTop: 10,
            color: isPositive ? 'var(--apex-green)' : 'var(--apex-red)',
          }}>
            {isPositive ? '+' : ''}{delta} vs last week
          </p>
        </div>
        <div style={{
          padding: 12,
          borderRadius: 16,
          background: 'var(--apex-blue-light)',
        }}>
          <Icon size={22} color="var(--apex-blue)" />
        </div>
      </div>
    </div>
  )
}

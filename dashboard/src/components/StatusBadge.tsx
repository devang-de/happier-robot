import { getStatusMeta } from '../theme/statusMeta'

interface Props {
  status: string
  className?: string
}

export default function StatusBadge({ status, className = '' }: Props) {
  const meta = getStatusMeta(status)
  return (
    <span
      className={`badge ${className}`}
      style={{
        color: meta.color,
        background: meta.bg,
      }}
    >
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        background: meta.color, display: 'inline-block', flexShrink: 0,
      }} />
      {meta.label}
    </span>
  )
}

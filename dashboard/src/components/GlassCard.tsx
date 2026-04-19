import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
  style?: React.CSSProperties
}

export default function GlassCard({ children, className = '', hover = false, onClick, style }: Props) {
  return (
    <div
      onClick={onClick}
      className={`card ${hover ? 'hover-lift' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

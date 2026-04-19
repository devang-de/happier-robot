import { useState, Fragment, type ReactNode } from 'react'
import { ChevronDown, ChevronUp, ChevronRight } from 'lucide-react'

export interface Column {
  key: string
  label: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (row: any) => ReactNode
  sortable?: boolean
}

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[]
  columns: Column[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expandable?: (row: any) => ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRowClick?: (row: any) => void
  keyField?: string
}

export default function DataTable({
  data,
  columns,
  expandable,
  onRowClick,
  keyField = 'id',
}: Props) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sorted = [...data].sort((a, b) => {
    if (!sortKey) return 0
    const aVal = String(a[sortKey] ?? '')
    const bVal = String(b[sortKey] ?? '')
    return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
  })

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <table className="apex-table">
        <thead>
          <tr>
            {expandable && <th className="expand-cell" />}
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => col.sortable !== false && handleSort(col.key)}
                style={col.sortable !== false ? { cursor: 'pointer', userSelect: 'none' } : undefined}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {col.label}
                  {sortKey === col.key &&
                    (sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => {
            const id = String(row[keyField])
            const isExpanded = expandedId === id
            return (
              <Fragment key={id}>
                <tr
                  onClick={() => {
                    if (expandable) setExpandedId(isExpanded ? null : id)
                    else if (onRowClick) onRowClick(row)
                  }}
                >
                  {expandable && (
                    <td className="expand-cell" style={{ paddingLeft: 14 }}>
                      <ChevronRight
                        size={14}
                        style={{
                          color: 'var(--text-faint)',
                          transition: 'transform 0.2s',
                          transform: isExpanded ? 'rotate(90deg)' : 'none',
                        }}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render ? col.render(row) : String(row[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
                {expandable && isExpanded && (
                  <tr>
                    <td colSpan={columns.length + 1} style={{ padding: 0 }}>
                      <div style={{
                        padding: '20px 24px',
                        background: 'var(--surface-soft)',
                        borderBottom: '1px solid var(--border-light)',
                      }}>
                        {expandable(row)}
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
  )
}

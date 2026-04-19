import { useState } from 'react'
import GlassCard from '../components/GlassCard'
import { Search, Loader2 } from 'lucide-react'

interface RecallResult {
  id?: string
  content?: string
  text?: string
  score?: number
  metadata?: Record<string, unknown>
}

const COGNEE_BASE = 'https://tenant-466bab74-626c-431d-b244-8fedc6fa0657.aws.cognee.ai'
const COGNEE_API_KEY = import.meta.env.VITE_COGNEE_API_KEY || ''
const COGNEE_TENANT_ID = '466bab74-626c-431d-b244-8fedc6fa0657'

const datasets = [
  { key: 'lead_context', label: 'Lead Context', color: '#FFB867' },
  { key: 'negotiation_brain', label: 'Negotiation Brain', color: '#7BE0AE' },
  { key: 'brain_patterns', label: 'Brain Patterns', color: '#9BB8ED' },
  { key: 'product_knowledge', label: 'Product Knowledge', color: '#D6A0D6' },
]

// Simple node-link graph visualization using SVG
function KnowledgeGraphPlaceholder({ activeDataset }: { activeDataset: string }) {
  const nodes = [
    { id: 'center', label: activeDataset.replace(/_/g, ' '), x: 250, y: 150, r: 30, color: datasets.find(d => d.key === activeDataset)?.color ?? '#FFB867' },
    { id: 'n1', label: 'Leads', x: 100, y: 60, r: 20, color: '#FFB867' },
    { id: 'n2', label: 'Calls', x: 400, y: 60, r: 20, color: '#7BE0AE' },
    { id: 'n3', label: 'Emails', x: 100, y: 240, r: 20, color: '#9BB8ED' },
    { id: 'n4', label: 'HITL', x: 400, y: 240, r: 20, color: '#D6A0D6' },
    { id: 'n5', label: 'Pricing', x: 50, y: 150, r: 16, color: '#F0CB82' },
    { id: 'n6', label: 'Legal', x: 450, y: 150, r: 16, color: '#FF8B85' },
    { id: 'n7', label: 'Product', x: 180, y: 280, r: 16, color: '#68D39B' },
    { id: 'n8', label: 'Deals', x: 320, y: 280, r: 16, color: '#FFB867' },
  ]
  const edges = [
    ['center', 'n1'], ['center', 'n2'], ['center', 'n3'], ['center', 'n4'],
    ['n1', 'n5'], ['n2', 'n6'], ['n3', 'n7'], ['n4', 'n8'],
    ['n5', 'n3'], ['n6', 'n4'], ['n1', 'n2'], ['n7', 'n8'],
  ]

  return (
    <svg width="500" height="320" viewBox="0 0 500 320" style={{ width: '100%', maxWidth: 500, margin: '0 auto', display: 'block' }}>
      {edges.map(([from, to], i) => {
        const a = nodes.find(n => n.id === from)!
        const b = nodes.find(n => n.id === to)!
        return (
          <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
        )
      })}
      {nodes.map(n => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} opacity={0.8} />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fill="white" fontSize={n.r > 20 ? 10 : 8} fontWeight={600} fontFamily="Manrope, sans-serif">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

export default function AgentBrain() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<RecallResult[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [activeDataset, setActiveDataset] = useState('lead_context')

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    setSearched(true)
    try {
      const res = await fetch(`${COGNEE_BASE}/api/v1/recall`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': COGNEE_API_KEY,
          'X-Tenant-Id': COGNEE_TENANT_ID,
        },
        body: JSON.stringify({ query: query.trim() }),
      })
      if (res.ok) {
        const data = await res.json()
        setResults(Array.isArray(data) ? data : data.results ?? data.data ?? [])
      } else {
        setResults([])
      }
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fade-up">
      {/* Search Bar */}
      <GlassCard style={{ marginBottom: 20 }}>
        <span className="mono-label" style={{ display: 'block', marginBottom: 12 }}>Knowledge Recall</span>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 10,
            padding: '12px 16px', borderRadius: 16,
            background: 'var(--surface-soft)', border: '1px solid var(--border)',
          }}>
            <Search size={18} color="var(--text-faint)" />
            <input
              type="text"
              placeholder="Ask the Agent Brain... (e.g. 'What pricing has been discussed with Allianz?')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                color: 'var(--text-primary)', fontFamily: "'Manrope', sans-serif",
                fontSize: '0.92rem',
              }}
            />
          </div>
          <button className="btn-primary" onClick={handleSearch} disabled={loading} style={{ minWidth: 100 }}>
            {loading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : 'Search'}
          </button>
        </div>

        {/* Results */}
        {searched && (
          <div style={{ marginTop: 16 }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: 20, color: 'var(--text-faint)' }}>
                Querying knowledge graph...
              </div>
            ) : results.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 20, color: 'var(--text-faint)', fontSize: '0.85rem' }}>
                No results found. Try a different query.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {results.slice(0, 8).map((r, i) => (
                  <div key={r.id ?? i} className="recall-card">
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {r.content ?? r.text ?? JSON.stringify(r)}
                    </div>
                    {r.score != null && (
                      <div style={{
                        marginTop: 8,
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: '0.7rem', color: 'var(--text-faint)',
                      }}>
                        Relevance: {(r.score * 100).toFixed(1)}%
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </GlassCard>

      {/* Dataset tabs + Knowledge Graph Visualization */}
      <GlassCard>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <span className="mono-label">Knowledge Graph</span>
        </div>
        {/* Dataset tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {datasets.map(d => (
            <button
              key={d.key}
              onClick={() => setActiveDataset(d.key)}
              style={{
                padding: '8px 16px',
                borderRadius: 12,
                border: `1px solid ${activeDataset === d.key ? d.color : 'var(--border)'}`,
                background: activeDataset === d.key ? `${d.color}20` : 'var(--surface-soft)',
                color: activeDataset === d.key ? d.color : 'var(--text-muted)',
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Graph visualization */}
        <div style={{
          padding: '40px 20px',
          borderRadius: 20,
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid var(--border-light)',
          minHeight: 360,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <KnowledgeGraphPlaceholder activeDataset={activeDataset} />
          <p style={{ fontSize: '0.78rem', color: 'var(--text-faint)', marginTop: 20, textAlign: 'center' }}>
            {activeDataset.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} dataset -- {
              activeDataset === 'lead_context' ? '8 leads, 47 interactions indexed'
              : activeDataset === 'negotiation_brain' ? '12 pricing patterns, 6 objection handlers'
              : activeDataset === 'brain_patterns' ? '23 conversation patterns, 8 escalation triggers'
              : '45 product features, 12 integration specs'
            }
          </p>
        </div>
      </GlassCard>
    </div>
  )
}

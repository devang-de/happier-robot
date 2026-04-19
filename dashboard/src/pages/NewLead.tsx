import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GlassCard from '../components/GlassCard'
import { Upload } from 'lucide-react'

export default function NewLead() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    company: '',
    contactName: '',
    email: '',
    phone: '',
    role: '',
    channel: 'phone',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would POST to the API
    navigate('/leads')
  }

  return (
    <div style={{ maxWidth: 640 }} className="fade-up">
      <div style={{ display: 'grid', gap: 16 }}>
        <GlassCard>
          <span className="mono-label" style={{ display: 'block', marginBottom: 20 }}>Add New Lead</span>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                Company Name *
              </label>
              <input
                type="text"
                className="apex-input"
                style={{ width: '100%' }}
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="e.g. Allianz, BMW, Siemens"
                required
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                  Contact Name *
                </label>
                <input
                  type="text"
                  className="apex-input"
                  style={{ width: '100%' }}
                  value={form.contactName}
                  onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                  placeholder="Full name"
                  required
                />
              </div>
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                  Role
                </label>
                <input
                  type="text"
                  className="apex-input"
                  style={{ width: '100%' }}
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="e.g. CTO, VP Product"
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                  Email *
                </label>
                <input
                  type="email"
                  className="apex-input"
                  style={{ width: '100%' }}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                  Phone
                </label>
                <input
                  type="tel"
                  className="apex-input"
                  style={{ width: '100%' }}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+49 ..."
                />
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                Preferred Channel
              </label>
              <select
                className="apex-select"
                style={{ width: '100%' }}
                value={form.channel}
                onChange={(e) => setForm({ ...form, channel: e.target.value })}
              >
                <option value="phone">Phone</option>
                <option value="email">Email</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <button type="submit" className="btn-primary">Create Lead</button>
              <button type="button" className="btn-ghost" onClick={() => navigate('/leads')}>Cancel</button>
            </div>
          </form>
        </GlassCard>

        <GlassCard>
          <span className="mono-label" style={{ display: 'block', marginBottom: 16 }}>Bulk Import</span>
          <div
            style={{
              border: '2px dashed var(--border)',
              borderRadius: 18,
              padding: '40px 24px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--apex-blue)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <Upload size={28} color="var(--text-faint)" style={{ marginBottom: 10 }} />
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: 4 }}>
              Drag & drop a CSV file here
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
              or click to browse. Columns: company, contact_name, email, phone, role
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

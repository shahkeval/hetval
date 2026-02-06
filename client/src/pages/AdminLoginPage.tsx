import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SectionTitle } from '../components/SectionTitle'
import { SoftButton } from '../components/SoftButton'
import { adminLogin } from '../utils/api'

export const AdminLoginPage: React.FC = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!password) return
    setLoading(true)
    setError(null)
    try {
      const { token } = await adminLogin(password)
      window.localStorage.setItem('valentine-admin-token', token)
      navigate('/admin/memories')
    } catch (err: any) {
      setError(err.message || 'The password did not feel right.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <SectionTitle
        eyebrow="Private side"
        title="Memory wall access"
        subtitle="This corner is just for you to read everything she shared, day by day."
      />
      <section className="page-section">
        <form onSubmit={handleSubmit}>
          <label
            style={{
              display: 'block',
              fontSize: '0.85rem',
              color: 'var(--text-soft)',
              marginBottom: 6,
            }}
          >
            Admin password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              borderRadius: 999,
              border: '1px solid rgba(210, 180, 222, 0.9)',
              padding: '9px 14px',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              boxSizing: 'border-box',
            }}
            placeholder="Tiny key to your memory wall"
          />
          {error && <p className="error-text">{error}</p>}
          <div style={{ marginTop: 14 }}>
            <SoftButton type="submit" disabled={loading || !password}>
              {loading ? 'Opening softly…' : 'Open memories 💌'}
            </SoftButton>
          </div>
          <p className="helper-text" style={{ marginTop: 10 }}>
            This is not a public page. Keep this password somewhere only you can reach.
          </p>
        </form>
      </section>
    </div>
  )
}


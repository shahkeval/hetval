import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SectionTitle } from '../components/SectionTitle'
import { SoftButton } from '../components/SoftButton'
import { getMemories, adminTestSend, adminTestSendFinal } from '../utils/api'

type MemoriesResponse = Awaited<ReturnType<typeof getMemories>>

export const AdminMemoriesPage: React.FC = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<MemoriesResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sendingSlug, setSendingSlug] = useState<string | null>(null)
  const [sendingFinal, setSendingFinal] = useState(false)

  useEffect(() => {
    const token = window.localStorage.getItem('valentine-admin-token')
    if (!token) {
      navigate('/admin')
      return
    }

    setLoading(true)
    setError(null)
    getMemories(token)
      .then((res) => setData(res))
      .catch((err: any) => {
        setError(err.message || 'Could not load memories.')
      })
      .finally(() => setLoading(false))
  }, [navigate])

  const handleLogout = () => {
    window.localStorage.removeItem('valentine-admin-token')
    navigate('/admin')
  }

  return (
    <div>
      <SectionTitle
        eyebrow="Your private memory wall"
        title="Every word she trusted you with."
        subtitle="Nothing here is for show — it’s just a quiet record of how she felt, day by day."
      />

      <section className="page-section" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <p className="helper-text" style={{ margin: 0, maxWidth: 360 }}>
          Read slowly. These are not just messages — they are little pieces of her heart that chose you.
        </p>
        <SoftButton type="button" onClick={handleLogout}>
          Close wall
        </SoftButton>
      </section>

      <section className="page-section" style={{ marginTop: 4, marginBottom: 10 }}>
        <p
          style={{
            fontSize: '0.8rem',
            color: 'var(--text-subtle)',
            margin: '0 0 8px',
          }}
        >
          For testing only: send any day&apos;s email now to your own inbox.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { slug: 'rose-day', label: 'Rose Day' },
            { slug: 'propose-day', label: 'Propose Day' },
            { slug: 'chocolate-day', label: 'Chocolate Day' },
            { slug: 'teddy-day', label: 'Teddy Day' },
            { slug: 'promise-day', label: 'Promise Day' },
            { slug: 'hug-day', label: 'Hug Day' },
            { slug: 'valentines-day', label: 'Valentine’s Day' },
          ].map(({ slug, label }) => (
            <SoftButton
              key={slug}
              type="button"
              disabled={!!sendingSlug}
              onClick={async () => {
                const token = window.localStorage.getItem('valentine-admin-token')
                if (!token) {
                  navigate('/admin')
                  return
                }
                try {
                  setSendingSlug(slug)
                  await adminTestSend(slug, token)
                  alert(`Test email for "${label}" has been sent to your configured email.`)
                } catch (err: any) {
                  alert(err.message || 'Could not send test email.')
                } finally {
                  setSendingSlug(null)
                }
              }}
            >
              {sendingSlug === slug ? `Sending ${label}…` : label}
            </SoftButton>
          ))}
          <SoftButton
            type="button"
            disabled={!!sendingSlug || sendingFinal}
            onClick={async () => {
              const token = window.localStorage.getItem('valentine-admin-token')
              if (!token) {
                navigate('/admin')
                return
              }
              try {
                setSendingFinal(true)
                await adminTestSendFinal(token)
                alert('Final feedback email has been sent to your configured email.')
              } catch (err: any) {
                alert(err.message || 'Could not send final feedback email.')
              } finally {
                setSendingFinal(false)
              }
            }}
          >
            {sendingFinal ? 'Sending final feedback…' : 'Final feedback email'}
          </SoftButton>
        </div>
      </section>

      {loading && <p style={{ marginTop: 8 }}>Gathering memories softly…</p>}
      {error && <p className="error-text">{error}</p>}

      {data && (
        <>
          <section className="page-section">
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                margin: '0 0 10px',
                color: 'var(--text-main)',
              }}
            >
              Valentine week messages
            </h2>
            {Object.keys(data.days).length === 0 && (
              <p className="helper-text">No messages yet — the wall is waiting to be filled.</p>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {Object.entries(data.days).map(([dayName, messages]) => (
                <div
                  key={dayName}
                  style={{
                    borderRadius: 18,
                    padding: 12,
                    background: 'linear-gradient(135deg, #fff8fb, #fdf5ff)',
                    border: '1px solid rgba(210, 180, 222, 0.7)',
                  }}
                >
                  <p
                    style={{
                      margin: '0 0 6px',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.95rem',
                      color: 'var(--text-main)',
                    }}
                  >
                    {dayName}
                  </p>
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      style={{
                        marginTop: 6,
                        padding: 8,
                        borderRadius: 12,
                        background: '#ffffff',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '0.85rem',
                          margin: 0,
                          whiteSpace: 'pre-wrap',
                          color: 'var(--text-soft)',
                        }}
                      >
                        {m.messageText}
                      </p>
                      <p
                        style={{
                          margin: '6px 0 0',
                          fontSize: '0.7rem',
                          color: 'var(--text-subtle)',
                        }}
                      >
                        {`Entry #${m.sequence ?? '?'} • ${new Date(m.submittedAt).toLocaleString()}`}
                      </p>
                    </div>
                  ))}

                  {data.audioDays?.[dayName] && data.audioDays[dayName].length > 0 && (
                    <div style={{ marginTop: 10 }}>
                      <p
                        style={{
                          margin: '0 0 4px',
                          fontSize: '0.8rem',
                          color: 'var(--text-subtle)',
                        }}
                      >
                        Voice notes for this day
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {data.audioDays[dayName].map((a) => (
                          <div
                            key={a.id}
                            style={{
                              padding: 6,
                              borderRadius: 10,
                              background: '#fff0f6',
                              border: '1px solid rgba(255, 182, 193, 0.6)',
                            }}
                          >
                            <audio controls src={a.audioUrl} style={{ width: '100%' }}>
                              Your browser does not support the audio element.
                            </audio>
                            <p
                              style={{
                                margin: '4px 0 0',
                                fontSize: '0.7rem',
                                color: 'var(--text-subtle)',
                              }}
                            >
                              {`Voice note #${a.sequence ?? '?'} • ${new Date(
                                a.submittedAt,
                              ).toLocaleString()}`}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="page-section">
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                margin: '0 0 10px',
                color: 'var(--text-main)',
              }}
            >
              Final feedback
            </h2>
            {data.feedback.length === 0 && (
              <p className="helper-text">
                No final note yet. When she shares it, it will gently appear here.
              </p>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {data.feedback.map((fb) => (
                <div
                  key={fb.id}
                  style={{
                    padding: 10,
                    borderRadius: 16,
                    background: 'linear-gradient(135deg, #fffaf4, #fff)',
                    border: '1px solid rgba(255, 206, 183, 0.9)',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.85rem',
                      margin: 0,
                      whiteSpace: 'pre-wrap',
                      color: 'var(--text-soft)',
                    }}
                  >
                    {fb.feedbackText}
                  </p>
                  <p
                    style={{
                      margin: '6px 0 0',
                      fontSize: '0.7rem',
                      color: 'var(--text-subtle)',
                    }}
                  >
                    {new Date(fb.submittedAt).toLocaleString()}
                  </p>
                </div>
              ))}

              {data.feedbackAudio && data.feedbackAudio.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <p
                    style={{
                      margin: '0 0 4px',
                      fontSize: '0.8rem',
                      color: 'var(--text-subtle)',
                    }}
                  >
                    Voice notes in final feedback
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {data.feedbackAudio.map((fa) => (
                      <div
                        key={fa.id}
                        style={{
                          padding: 6,
                          borderRadius: 10,
                          background: '#fff0f6',
                          border: '1px solid rgba(255, 182, 193, 0.6)',
                        }}
                      >
                        <audio controls src={fa.audioUrl} style={{ width: '100%' }}>
                          Your browser does not support the audio element.
                        </audio>
                        <p
                          style={{
                            margin: '4px 0 0',
                            fontSize: '0.7rem',
                            color: 'var(--text-subtle)',
                          }}
                        >
                          {`Voice note #${fa.sequence ?? '?'} • ${new Date(
                            fa.submittedAt,
                          ).toLocaleString()}`}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  )
}


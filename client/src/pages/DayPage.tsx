import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SectionTitle } from '../components/SectionTitle'
import { SoftButton } from '../components/SoftButton'
import { getDay, submitMessage, submitAudioMessage } from '../utils/api'

type DayData = Awaited<ReturnType<typeof getDay>>

export const DayPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [day, setDay] = useState<DayData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [justSubmitted, setJustSubmitted] = useState(false)
  const [recording, setRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [audioError, setAudioError] = useState<string | null>(null)
  const [uploadingAudio, setUploadingAudio] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setError(null)
    getDay(slug)
      .then((data) => {
        setDay(data)
      })
      .catch((err) => {
        setError(err.message || 'Could not load this day.')
      })
      .finally(() => setLoading(false))
  }, [slug])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!slug || !text.trim()) return
    setSubmitting(true)
    setError(null)
    try {
      await submitMessage(slug, text.trim())
      setText('')
      setJustSubmitted(true)
      // Hide the success highlight after a short moment
      setTimeout(() => setJustSubmitted(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Something went wrong while saving your words.')
    } finally {
      setSubmitting(false)
    }
  }

  async function startRecording() {
    try {
      setAudioError(null)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const chunks: BlobPart[] = []
      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder

      recorder.ondataavailable = (e: BlobEvent) => {
        if (e.data && e.data.size > 0) {
          chunks.push(e.data)
        }
      }

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' })
        setAudioBlob(blob)
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl)
        }
        setAudioUrl(URL.createObjectURL(blob))
        stream.getTracks().forEach((t) => t.stop())
        setRecording(false)
      }

      recorder.start()
      setRecording(true)
      setAudioBlob(null)
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
        setAudioUrl(null)
      }
    } catch (err: any) {
      setAudioError(
        err?.message ||
          'Your browser did not allow microphone access. Please check permissions and try again.'
      )
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop()
    }
  }

  async function handleAudioUpload() {
    if (!slug || !audioBlob) return
    setUploadingAudio(true)
    setAudioError(null)
    try {
      await submitAudioMessage(slug, audioBlob)
      setAudioError(null)
      setAudioBlob(null)
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
        setAudioUrl(null)
      }
      setJustSubmitted(true)
      setTimeout(() => setJustSubmitted(false), 3000)
    } catch (err: any) {
      setAudioError(err.message || 'Something went wrong while saving your voice.')
    } finally {
      setUploadingAudio(false)
    }
  }

  if (loading) {
    return <p style={{ textAlign: 'center', margin: 0 }}>Softly loading today&apos;s letter…</p>
  }

  if (error || !day) {
    return (
      <p style={{ textAlign: 'center', margin: 0 }}>
        {error || 'This page seems shy. Try opening it again from your email.'}
      </p>
    )
  }

  return (
    <div>
      <SectionTitle
        eyebrow={day.dayName}
        title={day.emailSubject.replace('💖', '').trim()}
        subtitle="Read this slowly, like a soft voice sitting beside you."
      />

      <section className="page-section">
        <div className="message-block fade-in" style={{ whiteSpace: 'pre-wrap' }}>
          {day.messageText}
        </div>
      </section>

      <section className="page-section">
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            margin: '0 0 8px',
            color: 'var(--text-main)',
          }}
        >
          Write what you feel…
        </h2>
        <p className="helper-text">
          It doesn&apos;t need to be perfect. Just honest, just you. These words will come only to
          me.
        </p>

        <form onSubmit={handleSubmit}>
          <textarea
            className="textarea-soft"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={submitting}
            placeholder="Type slowly. Breathe. Let your heart speak in its own language…"
          />
          {error && <p className="error-text">{error}</p>}
          <div
            style={{
              marginTop: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <SoftButton
              type="submit"
              disabled={submitting || !text.trim()}
              className="soft-pulse"
            >
              {submitting ? 'Gently saving…' : 'Send this to me 💌'}
            </SoftButton>
          </div>
          {justSubmitted && (
            <div style={{ marginTop: 12 }} className="success-row">
              <span className="success-heart heart-burst" />
              <span>Your words are safe with me, and I&apos;ll treasure them quietly.</span>
            </div>
          )}
        </form>
      </section>

      <section className="page-section">
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.05rem',
            margin: '0 0 8px',
            color: 'var(--text-main)',
          }}
        >
          Or speak what you feel…
        </h2>
        <p className="helper-text">
          If writing feels heavy, you can simply talk. Your voice will be saved privately for me,
          just like your words.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8, marginBottom: 8 }}>
          {!recording && (
            <SoftButton
              type="button"
              onClick={startRecording}
              disabled={uploadingAudio}
            >
              Start recording 🎙️
            </SoftButton>
          )}
          {recording && (
            <SoftButton type="button" onClick={stopRecording}>
              Stop recording ⏹️
            </SoftButton>
          )}
          {audioBlob && !recording && (
            <SoftButton
              type="button"
              onClick={handleAudioUpload}
              disabled={uploadingAudio}
            >
              {uploadingAudio ? 'Gently saving your voice…' : 'Send this voice note 💌'}
            </SoftButton>
          )}
        </div>
        {audioUrl && (
          <div style={{ marginTop: 8 }}>
            <audio controls src={audioUrl} style={{ width: '100%' }}>
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
        {audioError && <p className="error-text">{audioError}</p>}
      </section>
    </div>
  )
}


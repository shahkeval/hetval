import React, { useRef, useState } from 'react'
import { SectionTitle } from '../components/SectionTitle'
import { SoftButton } from '../components/SoftButton'
import { submitFeedback, submitFeedbackAudio } from '../utils/api'

export const FeedbackPage: React.FC = () => {
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [justSubmitted, setJustSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [recording, setRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [audioError, setAudioError] = useState<string | null>(null)
  const [uploadingAudio, setUploadingAudio] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    setSubmitting(true)
    setError(null)
    try {
      await submitFeedback(text.trim())
      setText('')
      setJustSubmitted(true)
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
    if (!audioBlob) return
    setUploadingAudio(true)
    setAudioError(null)
    try {
      await submitFeedbackAudio(audioBlob)
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

  return (
    <div>
      <SectionTitle
        eyebrow="One last little note"
        title="How did this week feel for you?"
        subtitle="There is no right way to answer. Just share whatever your heart remembers."
      />

      <section className="page-section">
        <form onSubmit={handleSubmit}>
          <textarea
            className="textarea-soft"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={submitting}
            placeholder="Was there a moment that stayed with you? Something you loved, something that felt too much, or something you wish was different?"
          />
          {error && <p className="error-text">{error}</p>}
          <div style={{ marginTop: 14 }}>
            <SoftButton
              type="submit"
              disabled={submitting || !text.trim()}
              className="soft-pulse"
            >
              {submitting ? 'Gently saving…' : 'Send this to me 💌'}
            </SoftButton>
          </div>
          {justSubmitted && (
            <div style={{ marginTop: 14 }} className="success-row">
              <span className="success-heart heart-burst" />
              <span>
                Thank you. Your feelings are heard, held, and deeply appreciated.
              </span>
            </div>
          )}
          <p className="helper-text" style={{ marginTop: 12 }}>
            This isn&apos;t a survey. It&apos;s just a quiet place where your feelings are allowed
            to exist as they are.
          </p>
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
          Or speak how this week felt…
        </h2>
        <p className="helper-text">
          If it&apos;s easier to say it out loud, you can leave a small voice note instead. It will
          stay just between us.
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


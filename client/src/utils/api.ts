const API_BASE =
  import.meta.env.VITE_API_BASE_URL || (window.location.origin.replace(/\/+$/, '') + '/api')

async function handleJson<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const message = (data as any).message || 'Something went wrong. Please try again.'
    throw new Error(message)
  }
  return data as T
}

export async function getDay(slug: string) {
  const res = await fetch(`${API_BASE}/days/${encodeURIComponent(slug)}`)
  return handleJson<{
    dayName: string
    slug: string
    theme: string
    palette: string[]
    emailSubject: string
    messageText: string
    animationStyle: string
  }>(res)
}

export async function submitMessage(daySlug: string, messageText: string) {
  const res = await fetch(`${API_BASE}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ daySlug, messageText }),
  })
  return handleJson<{ message: string }>(res)
}

export async function submitAudioMessage(daySlug: string, audioBlob: Blob) {
  const formData = new FormData()
  formData.append('daySlug', daySlug)
  formData.append('audio', audioBlob, 'voice.webm')

  const res = await fetch(`${API_BASE}/messages/audio`, {
    method: 'POST',
    body: formData,
  })
  return handleJson<{ message: string }>(res)
}

export async function submitFeedback(feedbackText: string) {
  const res = await fetch(`${API_BASE}/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ feedbackText }),
  })
  return handleJson<{ message: string }>(res)
}

export async function submitFeedbackAudio(audioBlob: Blob) {
  const formData = new FormData()
  formData.append('audio', audioBlob, 'feedback.webm')

  const res = await fetch(`${API_BASE}/feedback/audio`, {
    method: 'POST',
    body: formData,
  })
  return handleJson<{ message: string }>(res)
}

export async function adminLogin(password: string) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
  return handleJson<{ token: string }>(res)
}

export async function getMemories(token: string) {
  const res = await fetch(`${API_BASE}/admin/memories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return handleJson<{
    days: Record<
      string,
      { id: string; messageText: string; submittedAt: string; sequence: number }[]
    >
    audioDays: Record<
      string,
      { id: string; audioUrl: string; submittedAt: string; sequence: number }[]
    >
    feedback: { id: string; feedbackText: string; submittedAt: string }[]
    feedbackAudio: { id: string; audioUrl: string; submittedAt: string; sequence: number }[]
  }>(res)
}

export async function adminTestSend(slug: string, token: string) {
  const res = await fetch(`${API_BASE}/admin/test-send/${encodeURIComponent(slug)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return handleJson<{ message: string }>(res)
}

export async function adminTestSendFinal(token: string) {
  const res = await fetch(`${API_BASE}/admin/test-send-final`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return handleJson<{ message: string }>(res)
}


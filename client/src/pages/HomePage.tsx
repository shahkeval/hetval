import React from 'react'
import { SectionTitle } from '../components/SectionTitle'
import { SoftButton } from '../components/SoftButton'

export const HomePage: React.FC = () => {
  return (
    <div>
      <SectionTitle
        eyebrow="A quiet little corner"
        title="This space is just for you."
        subtitle="Each morning of Valentine week, a small letter will wait in your inbox, opening a private page like this one."
      />

      <section className="page-section" style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-soft)', marginBottom: 16 }}>
          You don&apos;t have to remember any link. Just open the email that finds you at 6 AM,
          tap the envelope, and let your heart take its time.
        </p>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-subtle)', marginBottom: 20 }}>
          When you write here, it doesn&apos;t go anywhere public. It comes only to me, and stays
          as a soft memory on our wall.
        </p>
        <SoftButton
          type="button"
          onClick={() => {
            window.location.href = 'mailto:'
          }}
        >
          Just know: you are already enough 💌
        </SoftButton>
      </section>
    </div>
  )
}


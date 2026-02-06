import React from 'react'

type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
}

export const SectionTitle: React.FC<Props> = ({ eyebrow, title, subtitle }) => {
  return (
    <header className="section-title">
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h1 className="section-heading glow-text">{title}</h1>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </header>
  )
}


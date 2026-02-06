import React from 'react'

export const AnimatedHearts: React.FC = () => {
  return (
    <div className="hearts-layer" aria-hidden="true">
      {Array.from({ length: 14 }).map((_, i) => (
        <span key={i} className={`floating-heart floating-heart-${(i % 7) + 1}`} />
      ))}
    </div>
  )
}


import React from 'react'
import { AnimatedHearts } from './AnimatedHearts'

type Props = {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="app-root">
      <AnimatedHearts />
      <main className="app-shell fade-in">
        {children}
      </main>
    </div>
  )
}


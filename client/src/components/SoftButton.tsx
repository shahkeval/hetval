import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost'
}

export const SoftButton: React.FC<Props> = ({ children, variant = 'primary', ...rest }) => {
  return (
    <button
      {...rest}
      className={`soft-button soft-button-${variant} ${rest.className ?? ''}`.trim()}
    >
      {children}
    </button>
  )
}


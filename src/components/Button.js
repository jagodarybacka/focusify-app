import React from 'react'
import './Button.css'

export default function Button({ label, onClick, isDisabled, isHidden, children }) {

  return (
    <button
      className={`Button ${isDisabled ? 'is-disabled' : ''} ${isHidden ? 'is-hidden': ''}`}
      onClick={onClick}>{children}</button>
  )
}

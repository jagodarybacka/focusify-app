import React from 'react'
import './styles.css'

export default function Button({ onClick, isDisabled, isHidden, children }) {

  return (
    <button
      className={`Button ${isDisabled ? 'is-disabled' : ''} ${isHidden ? 'is-hidden': ''}`}
      onClick={onClick}>{children}</button>
  )
}

import React from 'react'
import './EditBox.css'

export default function EditBox({label, content, onClick}) {
  return (
    <div className="EditBox">
      <label className="EditBox__label">{label}</label>
      <div className="EditBox__content">
        <span className="EditBox__content-text" title={content}>{content}</span>
        <button className="EditBox__content-edit" onClick={onClick}>🖊️</button>
      </div>
    </div>
  )
}

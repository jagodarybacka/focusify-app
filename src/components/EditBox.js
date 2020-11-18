import React from 'react'

export default function EditBox({label, content, onClick}) {
  return (
    <div className="EditBox">
      <label className="EditBox__label">{label}</label>
      <div>
        <span>{content}</span>
        <button onClick={onClick}>Edit</button>
      </div>
    </div>
  )
}
